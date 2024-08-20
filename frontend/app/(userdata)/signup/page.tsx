'use client'
import React, { SetStateAction, useState } from 'react';
import { FormProps , Button, Form, Input,  Alert } from 'antd';
import Link from "next/link";
import { useRegisterMutation } from '@/app/features/api/userapi';

type FieldType = {
    name?: string;
    email?: string;
    password?: string;
};

export default function SignUp () {
    
    const [loadings, setLoadings] = useState<boolean[]>([]);
    const [message, setMessage] = useState('')
    const [register, { isLoading, isError, isSuccess }] = useRegisterMutation();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setMessage('')
        try {
        const result: any = await register(values)
        if (result.error) {
            setMessage(result.error.data)
        } else {
            if (result.data) {
                setMessage(result.data)
            }
        }
        } catch (error) {
            setMessage('unknown error occured')
        } finally {
            setLoadings([])
        }
    }

    
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        setMessage('')
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
        }, 60000);
    };

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
        <div className='bg-transparent backdrop-blur-3xl lg:w-[50%] w-[80%] h-[80%] shadow-2xl px-5 flex justify-center'>
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
                    Create an Account
                </h1>
                <Form.Item<FieldType>
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
                >
                <Input />
                </Form.Item>

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
                <div className='pb-2'>
                    {
                        message == 'Email sent, verify your email to continue' ? 
                        <Alert message={message} type="success" showIcon /> :
                        message == '' ? <></> :
                        <Alert message={message} type="error" showIcon />
                    }
                </div>
                <Form.Item>
                <Button block type="primary" htmlType="submit" 
                loading={loadings[0]} onClick={() => enterLoading(0)}>
                    Sign up
                </Button>
                </Form.Item>
                <div className='flex justify-center w-full items-center gap-5'>
                    <div className='pl-5 pt-1 font-medium'>
                        Already have an account?
                    </div>
                    <Link href='/signin' className='font-medium hover:text-rare'>
                        Signin
                    </Link>
                </div>
            </Form>
        </div>
        </div>
    );
}