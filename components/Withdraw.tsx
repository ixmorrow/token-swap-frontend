import { Box, HStack, Spacer, Stack, Text, Button, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper  } from '@chakra-ui/react'
import { FC, useState } from 'react'
import * as Web3 from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { getATA, createATA } from './utils'
import { kryptMint, ScroogeCoinMint, token_account_pool, token_swap_state_account, swap_authority, pool_mint, pool_krypt_account, fee_account, pool_scrooge_account } from './const'
import { WithdrawAllSchema } from '../models/Data'
import { TOKEN_SWAP_PROGRAM_ID } from './const'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

export const WithdrawSingleTokenType: FC = () => {
    const [amount, setAmount] = useState(0)

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const handleWithdrawSubmit = (event: any) => {
        event.preventDefault()
        const withdraw = new WithdrawAllSchema(amount, 1, 1)
        handleTransactionSubmit(withdraw)
    }

    const handleTransactionSubmit = async (withdraw: WithdrawAllSchema) => {
        if (!publicKey) {
            alert('Please connect your wallet!')
            return
        }
        /*

            build withdrawal transaction here


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
        <form onSubmit={handleWithdrawSubmit}>
            <FormControl isRequired>
                <FormLabel color='gray.200'>
                    LP-Token Withdrawal Amount
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
                Withdraw
            </Button>
        </form>
        

        </Box>
    )
}