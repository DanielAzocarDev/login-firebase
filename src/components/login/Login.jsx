import { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Divider,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseAuth } from '../../firebase/config'
import { signInWithGoogle } from '../../firebase/providers'

export const Login = () => {

  //Modal
  const [isOpen, setIsOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

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
        const user = userCredential.user;
        setIsLoading(false)
        setIsOpen(true)
        setModalMessage('Login successfully!')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsLoading(false)
        setIsOpen(true)
        setModalMessage('Something when wrong, try again!')
      });
  }

  const loginGoogle = () => {
    signInWithGoogle().then(() => {

      setIsOpen(true)
      setModalMessage('Login successfully!')
    }).catch(() => {
      setIsOpen(true)
      setModalMessage('Something when wrong, try again!')
    })
  }

  const toggleModal = () => {
    setIsOpen(!isOpen)
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
          <Button mt='2.5' w='100%' onClick={loginGoogle} colorScheme='blackAlpha' variant='solid'>
            Signin with Google
          </Button>
        </Center>
      </Stack>

      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={toggleModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize='lg'>{modalMessage}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={toggleModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}
