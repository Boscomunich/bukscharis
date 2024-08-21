'use client'
import React, { useState } from 'react';
import { FormProps , Button, Form, Input, Alert, Checkbox } from 'antd';
import Link from "next/link";
import { FcGoogle } from 'react-icons/fc';
import { signIn } from "next-auth/react"
import { useLoginMutation } from '@/app/features/api/userapi';

type FieldType = {
    email?: string;
    password?: string;
};

export default function SignUp () {
    const [message, setMessage] = useState('')
    const [loadings, setLoadings] = useState<boolean[]>([]);
    const [login, { isLoading, isError, isSuccess }] = useLoginMutation();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setMessage('')
        try {
            const result: any = await login(values)
            if (result.error) {
                setMessage(result.error.data)
            } else {
                if (result.data) {1
                    signIn("credentials", {
                        email: result.data.email,
                        token: result.data.token,
                        id: result.data.id,
                        redirectTo: '/'
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        setLoadings([])
    }


    const enterLoading = (index: number) => {
        setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
        });

        setTimeout(() => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = false;
            return newLoadings;
        });
        }, 6000);
    };

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
        <div className='bg-transparent backdrop-blur-3xl lg:w-[50%] w-[80%] h-[95%] shadow-2xl px-5 flex justify-center'>
            <Form
            name="basic"
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 36 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            preserve={false}
            requiredMark={false}>
                <h1 className='text-center text-3xl font-bold my-10'>
                    Sign In
                </h1>
                <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <div className='flex justify-center gap-8 lg:gap-12 w-full my-4'>
                    <Checkbox>Remember me</Checkbox>
                    <Link href="" className='hover:text-rare'>Forgot password</Link>
                </div>
                <div>
                    {
                        message == '' ? <></> :
                        <Alert message={message} type="error" showIcon />
                    }
                </div>
                <Form.Item>
                    <Button block type="primary" htmlType="submit" 
                    loading={loadings[0]} onClick={() => enterLoading(0)}>
                        Sign in
                    </Button>
                </Form.Item>
                <div className='flex justify-center w-full items-center gap-5'>
                    <div className='font-medium'>
                        Don’t have an account?
                    </div>
                    <Link href='/signup' className='font-medium hover:text-rare'>
                        Signup
                    </Link>
                </div>
                <div className=' pt-4 font-medium w-full text-center'>
                    or login using
                </div>
                <div className='flex justify-center w-full items-center gap-5 mt-2'>
                    <div className='border border-darkBg rounded-md py-2 w-full dark:border-rare flex justify-center gap-2 items-center'>
                        <FcGoogle className='text-2xl'/>
                        <p className='font-medium'>Google</p>
                    </div>
                </div>
            </Form>
        </div>
        </div>
    );
}