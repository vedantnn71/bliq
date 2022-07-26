import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import { useRef, forwardRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

interface PasswordFieldProps extends InputProps {
  value: string;
  setValue: any;
  errors: {
    email?: string;
    password?: string;
    form?: string;
  };
  setErrors: any;
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ value, setValue, errors, setErrors, ...props }, ref) => {
    const { isOpen, onToggle } = useDisclosure();
    const inputRef = useRef<HTMLInputElement>(null);

    const mergeRef = useMergeRefs(inputRef, ref);
    const onClickReveal = () => {
      onToggle();
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);

      if (value === "") {
        setErrors({ password: "Password can't be blank" });
      }

      if (value.length < 8) {
        setErrors({ password: "Password too short" });
      }

      if (value !== "" && value.length > 8) {
        setErrors({ password: "" });
      }
    };

    return (
      <FormControl>
        <FormLabel color={errors.password ? "red" : ""} htmlFor="password">
          {errors.password || "Password"}
        </FormLabel>
        <InputGroup>
          <InputRightElement>
            <IconButton
              variant="link"
              aria-label={isOpen ? "Mask password" : "Reveal password"}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
          <Input
            id="password"
            ref={mergeRef}
            name="password"
            type={isOpen ? "text" : "password"}
            autoComplete="current-password"
            onChange={handlePasswordChange}
            required
            {...props}
          />
        </InputGroup>
      </FormControl>
    );
  }
);

export default PasswordField;
PasswordField.displayName = "PasswordField";
