import { type Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js"
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token"

// USDC devnet token address (this is a common devnet USDC address)
export const USDC_MINT = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU")

// Use localStorage to persist mock USDC balances
const getMockUsdcBalances = (): Record<string, number> => {
  if (typeof window === "undefined") return {}
  const stored = localStorage.getItem("mockUsdcBalances")
  return stored ? JSON.parse(stored) : {}
}

const setMockUsdcBalance = (walletKey: string, amount: number): void => {
  if (typeof window === "undefined") return
  const balances = getMockUsdcBalances()
  balances[walletKey] = amount
  localStorage.setItem("mockUsdcBalances", JSON.stringify(balances))
}

// Function to fetch SOL/USDC exchange rate
// In a real app, you would fetch this from an oracle or exchange API
export async function getSOLtoUSDCRate(): Promise<number> {
  try {
    // For demo purposes, we'll use a fixed rate
    // In production, you would fetch this from an API like CoinGecko or a Solana oracle
    return 130.5 // 1 SOL = 130.5 USDC (example rate)
  } catch (error) {
    console.error("Error fetching SOL/USDC rate:", error)
    throw new Error("Failed to fetch exchange rate")
  }
}

// Function to check if a user has a USDC token account
export async function checkUSDCTokenAccount(
  connection: Connection,
  walletAddress: PublicKey,
): Promise<{ exists: boolean; address: PublicKey }> {
  try {
    const tokenAccountAddress = await getAssociatedTokenAddress(USDC_MINT, walletAddress)

    const tokenAccountInfo = await connection.getAccountInfo(tokenAccountAddress)

    return {
      exists: tokenAccountInfo !== null,
      address: tokenAccountAddress,
    }
  } catch (error) {
    console.error("Error checking USDC token account:", error)
    throw error
  }
}

// Function to create a USDC token account if it doesn't exist
export async function createUSDCTokenAccountIfNeeded(
  connection: Connection,
  walletAddress: PublicKey,
  signTransaction: (transaction: Transaction) => Promise<Transaction>,
): Promise<PublicKey> {
  try {
    const { exists, address } = await checkUSDCTokenAccount(connection, walletAddress)

    if (!exists) {
      const transaction = new Transaction()

      // Get a recent blockhash
      const { blockhash } = await connection.getLatestBlockhash("finalized")
      transaction.recentBlockhash = blockhash
      transaction.feePayer = walletAddress

      transaction.add(
        createAssociatedTokenAccountInstruction(
          walletAddress, // payer
          address, // associated token account address
          walletAddress, // owner
          USDC_MINT, // mint
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID,
        ),
      )

      const signedTx = await signTransaction(transaction)
      const txid = await connection.sendRawTransaction(signedTx.serialize())
      await connection.confirmTransaction(txid)

      console.log("Created USDC token account:", address.toString())
    }

    return address
  } catch (error) {
    console.error("Error creating USDC token account:", error)
    throw error
  }
}

// This is a simulated function since we can't actually mint USDC on devnet
// In a real app, you would use a liquidity pool or exchange service
export async function simulateSOLtoUSDCSwap(
  connection: Connection,
  walletPublicKey: PublicKey,
  signTransaction: (transaction: Transaction) => Promise<Transaction>,
  solAmount: number,
  usdcAmount: number,
): Promise<string> {
  try {
    // First ensure the user has a USDC token account
    const usdcTokenAccount = await createUSDCTokenAccountIfNeeded(connection, walletPublicKey, signTransaction)

    // For demonstration purposes, we'll just transfer SOL to a "swap" account
    // In a real app, this would be a swap contract or liquidity pool
    const swapAccountKeypair = new PublicKey("8ZKGHEQhpPcivktXgYGVeJjnpXZ8xvRJCVQsUBXAUEXM") // Example address

    // Create a new transaction
    const transaction = new Transaction()

    // Get a recent blockhash to include in the transaction
    const { blockhash } = await connection.getLatestBlockhash("finalized")
    transaction.recentBlockhash = blockhash
    transaction.feePayer = walletPublicKey

    // Add instruction to transfer SOL
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: walletPublicKey,
        toPubkey: swapAccountKeypair,
        lamports: solAmount * LAMPORTS_PER_SOL,
      }),
    )

    // Sign and send the transaction
    const signedTx = await signTransaction(transaction)
    const txid = await connection.sendRawTransaction(signedTx.serialize())
    await connection.confirmTransaction(txid)

    // In a real app, the swap contract would send USDC back to the user
    // Since we can't actually mint USDC on devnet, we'll simulate it by updating our mock balances
    const walletKey = walletPublicKey.toString()
    const currentBalance = getMockUsdcBalances()[walletKey] || 0
    setMockUsdcBalance(walletKey, currentBalance + usdcAmount)
    console.log(`Simulated USDC transfer: +${usdcAmount} USDC to ${walletKey}`)
    console.log(`New simulated USDC balance: ${getMockUsdcBalances()[walletKey]} USDC`)

    return txid
  } catch (error) {
    console.error("Error performing SOL to USDC swap:", error)
    throw error
  }
}

// Function to get SOL balance
export async function getSOLBalance(connection: Connection, walletAddress: PublicKey): Promise<number> {
  try {
    const balance = await connection.getBalance(walletAddress)
    return balance / LAMPORTS_PER_SOL
  } catch (error) {
    console.error("Error fetching SOL balance:", error)
    throw error
  }
}

// Function to get USDC balance
export async function getUSDCBalance(connection: Connection, walletAddress: PublicKey): Promise<number> {
  try {
    const walletKey = walletAddress.toString()
    const mockBalances = getMockUsdcBalances()

    // First check our mock balances (for simulation)
    if (mockBalances[walletKey]) {
      console.log(`Using simulated USDC balance: ${mockBalances[walletKey]} USDC for ${walletKey}`)
      return mockBalances[walletKey]
    }

    // If no mock balance, check the actual token account (which will likely be 0 on devnet)
    const { exists, address } = await checkUSDCTokenAccount(connection, walletAddress)

    if (!exists) {
      return 0
    }

    try {
      const tokenAccountInfo = await connection.getTokenAccountBalance(address)
      return tokenAccountInfo.value.uiAmount || 0
    } catch (error) {
      console.log("Token account exists but has no balance or is not initialized")
      return 0
    }
  } catch (error) {
    console.error("Error fetching USDC balance:", error)
    // If there's an error (like the account doesn't exist), return 0
    return 0
  }
}

// Add this new function to handle premium content purchases
export async function decrementUSDCBalance(walletAddress: PublicKey, amount: number): Promise<boolean> {
  try {
    const walletKey = walletAddress.toString()
    const mockBalances = getMockUsdcBalances()

    if (!mockBalances[walletKey] || mockBalances[walletKey] < amount) {
      return false
    }

    setMockUsdcBalance(walletKey, mockBalances[walletKey] - amount)
    console.log(`Simulated USDC payment: -${amount} USDC from ${walletKey}`)
    console.log(`New simulated USDC balance: ${getMockUsdcBalances()[walletKey]} USDC`)

    // Dispatch an event to notify components about the balance update
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("usdc-balance-update"))
    }

    return true
  } catch (error) {
    console.error("Error decrementing USDC balance:", error)
    return false
  }
}

// Add this new function after the decrementUSDCBalance function

// Function to increment USDC balance (for rewards)
export async function incrementUSDCBalance(walletAddress: PublicKey, amount: number): Promise<boolean> {
  try {
    const walletKey = walletAddress.toString()
    const mockBalances = getMockUsdcBalances()

    // Initialize balance if it doesn't exist
    if (!mockBalances[walletKey]) {
      mockBalances[walletKey] = 0
    }

    // Add the reward amount
    setMockUsdcBalance(walletKey, mockBalances[walletKey] + amount)
    console.log(`Simulated USDC reward: +${amount} USDC to ${walletKey}`)
    console.log(`New simulated USDC balance: ${getMockUsdcBalances()[walletKey]} USDC`)

    // Dispatch an event to notify components about the balance update
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("usdc-balance-update"))
    }

    return true
  } catch (error) {
    console.error("Error incrementing USDC balance:", error)
    return false
  }
}
