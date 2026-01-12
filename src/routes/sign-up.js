import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import AppTheme from '../shared-theme/AppTheme';
import { styled, Card, CardContent, Typography, Button, Grid, CssBaseline, FormLabel, OutlinedInput } from '@mui/material';

export default function SignUp(props) {
    const { 
        register, // links inputs to form state
        handleSubmit, // prevents default form submission, validates input, and manages error state before submission
        setError,
        formState: { errors, isSubmitting }, // errors: contains each form field and corresponding errors, isSubmitting: maintains submitting state
     } = useForm();
    
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log("submit button pressed");
        try {
            const response = await fetch('http://localhost:8080/api/sign-up', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: data.user,
                    email: data.email,
                    password: data.password
                })
            });
            
            const responseData = await response.json();

            if (!response.ok) throw new Error(responseData.message);
            console.log('Sign up successful!');
            navigate("/");
            
        } catch (err) {
            setError("root", {
                message: err.message || "Something went wrong. I'm sorry!",
            })
        }
    }
     
    const FormGrid = styled(Grid)(() => ({
        display: 'flex',
        flexDirection: 'column',
    }));

    return (
        <AppTheme {...props}>
            {/* <CssBaseline enableColorScheme /> */}
            <Grid container spacing={3} justifyContent={"center"}>
                <Card sx={{ mt: 3, minWidth: 375 }}>
                    <CardContent>
                        <Typography variant="h4" sx={{ mb: 2 }}>
                            Sign up
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Username input */}
                            <FormGrid sx={{ xs: 12, md: 6}}>
                                <FormLabel htmlFor="first-name" required>
                                Username
                                </FormLabel>
                                <OutlinedInput
                                    {...register("user", { required: "Username is required" })}
                                />
                                {errors.user && 
                                    (<Typography style = {{color:"red"}}>{errors.user.message}</Typography>)}
                            </FormGrid>

                            {/* Email input */}
                            <FormGrid sx={{ xs: 12, md: 6}}>
                                <FormLabel htmlFor="first-name" required>
                                Email
                                </FormLabel>
                                <OutlinedInput 
                                    {...register("email", { 
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/,
                                            message: "Email is not valid"
                                        }
                                    })}
                                />
                                {errors.email && 
                                    (<Typography style = {{color:"red"}}>{errors.email.message}</Typography>)}
                            </FormGrid>

                            {/* Password input */}
                            <FormGrid sx={{ xs: 12, md: 6}}>
                                <FormLabel htmlFor="first-name" required>
                                Password
                                </FormLabel>
                                <OutlinedInput type="password"
                                    {...register("password", { 
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must contain at least 8 characters"
                                        }
                                    })}
                                />
                                {errors.password && 
                                    (<Typography style = {{color:"red"}}>{errors.password.message}</Typography>)}
                            </FormGrid>
                            
                            {/* Sign up button */}
                            <Button disabled={isSubmitting} type="submit" color="secondary" variant="contained" size="small" sx = {{mt: 2}}> 
                                {isSubmitting ? "Loading..." : "Sign up"}
                            </Button>
                            {errors.root && 
                                (<Typography style = {{color:"red"}}>{errors.root.message}</Typography>)}
                        </form>
                    </CardContent>

                </Card>
            </Grid>
        </AppTheme>
    );
}