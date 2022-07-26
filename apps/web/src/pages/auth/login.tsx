import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import type { ChangeEvent, MouseEvent } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import OAuthButtonGroup from "components/auth/oauthButtonGroup";
import PasswordField from "components/auth/passwordField";
import Image from "next/image";
import logo from "assets/logo.svg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { status } = useSession();
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    form?: string;
  }>({
    email: "",
    password: "",
    form: "",
  });
  const router = useRouter();

  const handleLogin = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!(errors.email === "" || errors.password === "")) return;

    signIn("credentials", { redirect: false, email, password })
      .then((res) => {
        setIsFetching(true);

        if (res?.status === 200 || res?.status === 201) {
          router.push("/");
        }

        if (res?.status === 401) {
          setErrors({
            form: "You don't seem to have an account, please signup",
          });
        }
      })
      .catch((error) => {
        setErrors({ form: "Ooppss, something went wrong at our end :(" });
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);

    if (email === "") {
      setErrors({ email: "Email can't be blank" });
    }

    if (!email.includes("@")) {
      setErrors({ email: "Invalid email" });
    }

    if (email !== "" && email.includes("@")) {
      setErrors({ email: "" });
    }
  };

  return (
    <Box bg={{ base: "white", md: "gray.100" }}>
      <Container
        maxW="lg"
        py={{ base: "12", md: "24" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack spacing="8">
          <Stack spacing="6">
            <Image height={80} width={80} src={logo} alt="Bliq" />
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={useBreakpointValue({ base: "md", md: "lg" })}>
                Welcome back! 👋
              </Heading>
              <HStack spacing="1" justify="center">
                <Text color="muted">Don&apos;t have an account?</Text>
                <Link href="/auth/signup">
                  <Button variant="link" color="brand.primary">
                    Signup
                  </Button>
                </Link>
              </HStack>
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "none", md: "white" }}
            boxShadow={{ base: "none", md: useColorModeValue("md", "md-dark") }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel color={errors.email ? "red" : ""} htmlFor="email">
                    {errors.email || "Email"}
                  </FormLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </FormControl>
                <PasswordField
                  value={password}
                  setValue={setPassword}
                  errors={errors}
                  setErrors={setErrors}
                />
              </Stack>
              <Stack spacing="6">
                <Button
                  onClick={handleLogin}
                  color="white"
                  variant="brand"
                  isLoading={isFetching}
                  isDisabled={
                    email === "" ||
                    !(errors.email === "" || errors.password === "")
                  }
                >
                  Log in
                </Button>
                <Text fontSize="sm" color="red.500" fontWeight="medium">
                  {errors.form}
                </Text>
                <HStack>
                  <Divider />
                </HStack>
                <OAuthButtonGroup />
              </Stack>
              <HStack justify="center">
                <Button variant="link" color="brand.primary" size="sm">
                  Forgot password?
                </Button>
              </HStack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Signup;
