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
import { LoginSchema, loginValidator } from "../validators/user.validator";
import { useLoginUserMutation } from "@/services/apiServices";
import { toast } from "@/components/ui/use-toast";

export function LoginForm() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginValidator),
    values: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: LoginSchema) => {
    const { data } = await loginUser(formData);
    toast({
      title: data.message,
    });
    navigate("/");
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
        <CardDescription>Enter your credentials to login</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-[350px]">
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
              Login
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to={"/auth/register"} className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
