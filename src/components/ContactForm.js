import React, {useState} from 'react';
import {Form, Button, Row, Col, Toast} from 'react-bootstrap';
import {Formik, Field, ErrorMessage} from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import './contacts.scss';


export default function ContactForm({onClose, onAddContact}) {
    const [isFormSubmitted, setFormSubmitted] = useState(false);

    const submitForm = (values, {resetForm}) => {
        if (values.firstName && values.surName && values.eMail) {
            if (!validateEmail(values.eMail) || !validatePhone(values.telNumber)) {
                return;
            }
            onAddContact(values);
            setFormSubmitted(true);
            resetForm();
            onClose();
        } else {

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

    const handleCloseSuccess = () => {
        setFormSubmitted(false);
    };

    return (
        <>
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
                        <Form className='form'>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>First Name:</Form.Label>
                                        <Field
                                            as={Form.Control}
                                            type='text'
                                            name='firstName'
                                            isInvalid={formik.touched.firstName && !formik.values.firstName}
                                        />
                                        <ErrorMessage name='firstName' component={Form.Control.Feedback}
                                                      type='invalid'/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Surname:</Form.Label>
                                        <Field
                                            as={Form.Control}
                                            type='text'
                                            name='surName'
                                            isInvalid={formik.touched.surName && !formik.values.surName}
                                        />
                                        <ErrorMessage name='surName' component={Form.Control.Feedback} type='invalid'/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Field
                                    as={Form.Control}
                                    type='text'
                                    name='eMail'
                                    placeholder="example@example.com"
                                    validate={validateEmail}
                                    isInvalid={formik.touched.eMail && !!formik.errors.eMail}
                                />
                                <ErrorMessage name='eMail' component={Form.Control.Feedback} type='invalid'/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone:</Form.Label>
                                <Field
                                    as={Form.Control}
                                    type='text'
                                    name='telNumber'
                                    placeholder="+380000000000"
                                    validate={validatePhone}
                                    isInvalid={formik.touched.telNumber && !!formik.errors.telNumber}
                                />
                                <ErrorMessage name='telNumber' component={Form.Control.Feedback} type='invalid'/>
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
                <Toast
                    show={isFormSubmitted}
                    onClose={handleCloseSuccess}
                    delay={3000}
                    autohide
                    className='toast'
                >
                    <Toast.Header>
                        <strong className='mr-auto'>Contact added successfully!</strong>
                    </Toast.Header>
                    <Toast.Body>Thank you.</Toast.Body>
                </Toast>
            </div>
        </>
    );
}
