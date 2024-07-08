import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "../hooks/useAuth";
import { useSendOtpMutation } from "@/services/apiServices";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your otp must be 6 characters long",
  }),
});

function OtpHandler() {
  const { user } = useAuth();
  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });
  const navigate = useNavigate();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { data: res } = await sendOtp({ ...user!, otp: data.pin });
      toast({
        title: "User created successfully" || res.message,
      });
      setTimeout(() => {
        navigate("/auth/login");
      }, 300);
    } catch (err) {
      console.log(err);
    }
  }
  if (!user) return <Navigate to={"/auth/register"} />;

  return (
    <div className="flex items-center justify-center w-full h-[100vh]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" bg-purple-600 rounded-md p-7 text-white">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your otp</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <p>Please enter the otp sent to your phone</p>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default OtpHandler;
