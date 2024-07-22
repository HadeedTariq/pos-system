import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterSchema,
  registerValidator,
} from "../validators/user.validator";
import { useRegisterUserMutation } from "@/services/apiServices";
import { toast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../reducer/authReducer";
import GoogleAuth from "../_components/GoogleAuth";

export function Register() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerValidator),
    values: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit = async (formData: RegisterSchema) => {
    const { data } = await registerUser(formData);
    toast({
      title: data.message,
    });
    dispatch(setUser(formData));
    navigate("/auth/otpChecker");
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-[350px] pr-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <div className="grid gap-2">
                      <Label htmlFor="last-name">Username</Label>
                      <Input placeholder="Ali" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input placeholder="m@example.com" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input type="password" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              Create an account
            </Button>
          </form>
        </Form>
        <GoogleAuth />
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to={"/auth/login"} className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
