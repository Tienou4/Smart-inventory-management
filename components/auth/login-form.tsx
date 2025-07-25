"use client"

import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/schemas'
import { Loader2 } from 'lucide-react'

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { signIn } from 'next-auth/react'
import { DEFAULT_REDIRECT } from '@/routes'
import { useSearchParams } from 'next/navigation'
import FormError from '../ui/form-error'
import Loader from '../ui/loader'

const LoginForm = () => {
  const searchParams = useSearchParams()
  const urlError = searchParams.get('error') === "OAuthAccountNotLinked"
    ? "Account not linked, email already in use with different account"
    : null

  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false)
  const [isGithubLoading, setIsGithubLoading] = React.useState(false)
  const [isMagicLinkSending, setIsMagicLinkSending] = React.useState(false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const isPending = form.formState.isSubmitting

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    try {
      setIsMagicLinkSending(true);
      await signIn('resend', {
        email: data.email,
        callbackUrl: DEFAULT_REDIRECT
      });
    } catch (error) {
      console.error(error);
      setIsMagicLinkSending(false);
    }
  }

  const onclick = async (provider: 'google' | 'github') => {
    await signIn(provider, { callbackUrl: DEFAULT_REDIRECT })
  }

  // ✅ Affiche le loader pendant l’envoi du lien magique
  if (isMagicLinkSending) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <Loader />
        <p className="text-muted-foreground mt-4">Envoi du lien magique...</p>
      </div>
    )
  }

  return (
    <Card className='max-w-sm w-full'>
      <CardHeader>
        <CardTitle className='text-2xl'>Sign in</CardTitle>
        <CardDescription>
          Please enter your email address and password to sign in
        </CardDescription>
      </CardHeader>

      <CardContent className='space-y-4'>
        <FormError message={urlError} />

        <Form {...form}>
          <form
            className='space-y-6'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name='email'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id='email'
                      type='email'
                      placeholder='enter your email to login'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name='password'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id='password'
                      type='password'
                      placeholder='enter your password'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='w-full'
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className='w-5 h-5 animate-spin' />
              ) : (
                'Sign in with email'
              )}
            </Button>
          </form>
        </Form>

        <div className='w-full flex items-center space-x-2'>
          <div className='h-[1px] w-full border' />
          <span className='flex-1'>Or</span>
          <div className='h-[1px] w-full border' />
        </div>

        <Button
          variant='outline'
          className='w-full space-x-2 flex'
          onClick={() => {
            setIsGoogleLoading(true);
            onclick('google');
          }}
          disabled={isPending}
        >
          {isGoogleLoading ? (
            <Loader2 className='w-5 h-5 animate-spin' />
          ) : (
            <>
              <FcGoogle className='w-6 h-6' />
              <span>Sign in with Google</span>
            </>
          )}
        </Button>

        <Button
          variant='outline'
          className='w-full space-x-2 flex'
          onClick={() => {
            setIsGithubLoading(true);
            onclick('github');
          }}
          disabled={isPending}
        >
          {isGithubLoading ? (
            <Loader2 className='w-5 h-5 animate-spin' />
          ) : (
            <>
              <FaGithub className='w-6 h-6' />
              <span>Sign in with Github</span>
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

export default LoginForm
