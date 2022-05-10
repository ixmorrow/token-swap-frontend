import { Box, HStack, Spacer, Stack, Text, Button, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper  } from '@chakra-ui/react'
import { FC, useState } from 'react'
import * as Web3 from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { AirdropSchema } from '../models/Data'
import { getATA, createATA } from './utils'
import { kryptMint, ScroogeCoinMint, airdropPDA, airdropProgramId } from './const'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

export const Airdrop: FC = () => {
    const [amount, setAmount] = useState(0)

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const handleKryptSubmit = (event: any) => {
        event.preventDefault()
        const airdrop = new AirdropSchema(amount)
        handleKryptTransactionSubmit(airdrop)
    }

    const handleKryptTransactionSubmit = async (airdrop: AirdropSchema) => {
        if (!publicKey) {
            alert('Please connect your wallet!')
            return
        }
        /*

          airdrop instruction here


        */

    }

    const handleScroogeSubmit = (event: any) => {
        event.preventDefault()
        const airdrop = new AirdropSchema(amount)
        handleScroogeTransactionSubmit(airdrop)
    }

    const handleScroogeTransactionSubmit = async (airdrop: AirdropSchema) => {
        if (!publicKey) {
            alert('Please connect your wallet!')
            return
        }
        const transaction = new Web3.Transaction()
        
        const userATA = await getATA(ScroogeCoinMint, publicKey)
        let account = await connection.getAccountInfo(userATA)
  
        if (account == null) {
          const createATAIX = await createATA(ScroogeCoinMint, userATA, publicKey)
          transaction.add(createATAIX)
        }

        const buffer = airdrop.serialize()
    
        const airdropIX = new Web3.TransactionInstruction({
            keys: [
              {
                pubkey: publicKey,
                isSigner: true,
                isWritable: true,
              },
              {
                pubkey: userATA,
                isSigner: false,
                isWritable: true,
              },
              {
                pubkey: ScroogeCoinMint,
                isSigner: false,
                isWritable: true,
              },
              {
                pubkey: airdropPDA,
                isSigner: false,
                isWritable: false,
              },
              {
                pubkey: TOKEN_PROGRAM_ID,
                isSigner: false,
                isWritable: false,
              }
            ],
            data: buffer,
            programId: airdropProgramId,
          })

        transaction.add(airdropIX)

        try {
            let txid = await sendTransaction(transaction, connection)
            alert(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)
            console.log(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)
        } catch (e) {
            console.log(JSON.stringify(e))
            alert(JSON.stringify(e))
        }

    }

    return (
        <Box
            p={4}
            display={{ md: "flex" }}
            maxWidth="32rem"
            margin={2}
            justifyContent="center"
        >
            <form style={{ margin:2 }} onSubmit={handleKryptSubmit}>
                <FormControl isRequired>
                    <FormLabel color='gray.200'>
                        Krypt
                    </FormLabel>
                    <NumberInput
                        max={1000}
                        min={1}
                        onChange={(valueString) => setAmount(parseInt(valueString))}
                    >
                        <NumberInputField id='amount' color='gray.400' />
                    </NumberInput>
                </FormControl>
                <Button width="full" mt={4} type="submit">
                    Airdrop Krypt
                </Button>
            </form>
            
            <form style={{ margin:2 }} onSubmit={handleScroogeSubmit}>
            <FormControl isRequired>
                <FormLabel color='gray.200'>
                    Scrooge 
                </FormLabel>
                <NumberInput
                    max={1000}
                    min={1}
                    onChange={(valueString) => setAmount(parseInt(valueString))}
                >
                    <NumberInputField id='amount' color='gray.400' />
                </NumberInput>
            </FormControl>
            <Button width="full" mt={4} type="submit">
                Airdrop Scrooge
            </Button>
        </form>
        </Box>
    )
}


