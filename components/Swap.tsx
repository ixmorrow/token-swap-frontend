import { Box, HStack, Spacer, Select, Text, Button, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper  } from '@chakra-ui/react'
import { FC, useState } from 'react'
import * as Web3 from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { getATA, createATA } from './utils'
import { kryptMint, ScroogeCoinMint, token_account_pool, token_swap_state_account, swap_authority, pool_mint, pool_krypt_account, fee_account, pool_scrooge_account } from './const'
import { SwapSchema } from '../models/Data'
import { TOKEN_SWAP_PROGRAM_ID } from './const'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'


export const SwapToken: FC = () => {
    const [amount, setAmount] = useState(0)
    const [mint, setMint] = useState('')

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const handleSwapSubmit = (event: any) => {
        event.preventDefault()
        const swap = new SwapSchema(amount, 0)
        handleTransactionSubmit(swap)
    }

    const handleTransactionSubmit = async (swap: SwapSchema) => {
        if (!publicKey) {
            alert('Please connect your wallet!')
            return
        }
    
        /*

            build swap transaction here


        */
    }


    return (
        <Box
        p={4}
        display={{ md: "flex" }}
        maxWidth="32rem"
        margin={2}
        justifyContent="center"
    >
        <form onSubmit={handleSwapSubmit}>
            <FormControl isRequired>
                <FormLabel color='gray.200'>
                    Swap Amount
                </FormLabel>
                <NumberInput
                    max={1000}
                    min={1}
                    onChange={(valueString) => setAmount(parseInt(valueString))}
                >
                    <NumberInputField id='amount' color='gray.400' />
                </NumberInput>
        <div style={{ display: "felx" }}>
          <Select
            display={{ md: "flex" }}
            justifyContent="center"
            placeholder="Token to Swap"
            color="white"
            variant='outline'
            dropShadow="#282c34"
            onChange={(item) => setMint(item.currentTarget.value)}
          >
            <option style={{ color:"#282c34" }} value='option1'> Krypt </option>
            <option style={{ color:"#282c34" }} value='option2'> Scrooge </option>
          </Select>
        </div>
            </FormControl>
            <Button width="full" mt={4} type="submit">
                Swap ⇅
            </Button>
        </form>
        

        </Box>
    )
}