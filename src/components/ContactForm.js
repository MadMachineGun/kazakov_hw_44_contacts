
import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';

export default function ContactForm({ onClose, onAddContact }) {
    const [submitError, setSubmitError] = useState(null);

    const submitForm = async (values, { resetForm }) => {
        const errors = {};
        if (!values.firstName) {
            errors.firstName = 'Please enter a first name.';
        }
        if (!values.surName) {
            errors.surName = 'Please enter a surname.';
        }
        if (!validatePhone(values.telNumber)) {
            errors.telNumber = 'Invalid phone number format. Please enter a valid phone number starting with +380.';
        }
        if (!validateEmail(values.eMail)) {
            errors.eMail = 'Invalid email address format. Please enter a valid email address.';
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
                    firstName: '',
                    surName: '',
                    eMail: '',
                    telNumber: '',
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
                                        name='firstName'
                                        isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                                    />
                                    <ErrorMessage name='firstName' component={Form.Control.Feedback} type='invalid' />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Surname:</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type='text'
                                        name='surName'
                                        isInvalid={formik.touched.surName && !!formik.errors.surName}
                                    />
                                    <ErrorMessage name='surName' component={Form.Control.Feedback} type='invalid' />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Field
                                as={Form.Control}
                                type='text'
                                name='eMail'
                                placeholder='example@example.com'
                                isInvalid={formik.touched.eMail && !!formik.errors.eMail}
                            />
                            <ErrorMessage name='eMail' component={Form.Control.Feedback} type='invalid' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone:</Form.Label>
                            <Field
                                as={Form.Control}
                                type='text'
                                name='telNumber'
                                placeholder='+380000000000'
                                isInvalid={formik.touched.telNumber && !!formik.errors.telNumber}
                            />
                            <ErrorMessage name='telNumber' component={Form.Control.Feedback} type='invalid' />
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


