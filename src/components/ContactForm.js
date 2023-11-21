import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';

export default function ContactForm({ onClose, onAddContact }) {
    const [submitError, setSubmitError] = useState(null);

    const submitForm = async (values, { resetForm }) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Please enter a first name.';
        }
        if (!values.username) {
            errors.username = 'Please enter a surname.';
        }
        if (!validatePhone(values.phone)) {
            errors.phone = 'Invalid phone number format. Please enter a valid phone number starting with +380.';
        }
        if (!validateEmail(values.email)) {
            errors.email = 'Invalid email address format. Please enter a valid email address.';
        }

        if (Object.keys(errors).length === 0) {
            onAddContact(values);
            resetForm();
            onClose();
        } else {
            setSubmitError(errors);
        }
    };

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !value || emailRegex.test(value);
    };

    const validatePhone = (value) => {
        const phoneRegex = /^\+380\d{9}$/;
        return !value || phoneRegex.test(value);
    };

    return (
        <div className='contact-form'>
            <Formik
                initialValues={{
                    name: '',
                    username: '',
                    email: '',
                    phone: '',
                }}
                onSubmit={submitForm}
            >
                {(formik) => (
                    <Form className='form' onSubmit={formik.handleSubmit}>
                        {submitError && (
                            <Alert variant='danger'>
                                {Object.values(submitError).map((error, index) => (
                                    <div key={index}>{error}</div>
                                ))}
                            </Alert>
                        )}
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>First Name:</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type='text'
                                        name='name'
                                        isInvalid={formik.touched.name && !!formik.errors.name}
                                    />
                                    <ErrorMessage name='name' component={Form.Control.Feedback} type='invalid' />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Surname:</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type='text'
                                        name='username'
                                        isInvalid={formik.touched.username && !!formik.errors.username}
                                    />
                                    <ErrorMessage name='username' component={Form.Control.Feedback} type='invalid' />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Field
                                as={Form.Control}
                                type='text'
                                name='email'
                                placeholder='example@example.com'
                                isInvalid={formik.touched.email && !!formik.errors.email}
                            />
                            <ErrorMessage name='email' component={Form.Control.Feedback} type='invalid' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone:</Form.Label>
                            <Field
                                as={Form.Control}
                                type='text'
                                name='phone'
                                placeholder='+380000000000'
                                isInvalid={formik.touched.phone && !!formik.errors.phone}
                            />
                            <ErrorMessage name='phone' component={Form.Control.Feedback} type='invalid' />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Button type='submit' variant='primary'>
                                    Save
                                </Button>
                            </Col>
                            <Col>
                                <Button type='button' variant='secondary' onClick={onClose}>
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
