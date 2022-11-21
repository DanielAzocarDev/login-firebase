import { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Divider,
  Stack,
} from '@chakra-ui/react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseAuth } from '../../firebase/config'
import { signInWithGoogle } from '../../firebase/providers'

export const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsLoading(true)
    signInWithEmailAndPassword(FirebaseAuth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setIsLoading(false)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsLoading(false)
      });
  }

  const signinGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }


  return (
    <>
      <Stack>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type='email' name='email' placeholder='joedoe@mail.com' onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type='password' name='password' placeholder='********' onChange={handleChange} />
          </FormControl>

          <Center>
            <Button isLoading={isLoading} loadingText='Submitting' mt='2.5' w='100%' type='submit' colorScheme='teal' variant='solid'>
              Login
            </Button>
          </Center>



        </form>
        <Divider mt='4' mb='4' orientation='horizontal' />

        <Center>
          <Button mt='2.5' w='100%' onClick={() => signInWithGoogle()} colorScheme='blackAlpha' variant='solid'>
            Signin with Google
          </Button>
        </Center>
      </Stack>
    </>
  )
}
