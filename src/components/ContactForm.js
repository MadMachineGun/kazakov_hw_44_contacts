import React from 'react';
import { useFormik } from 'formik';
import './contact-form.scss';

export default function ContactForm({ onClose }) {
    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            phone: '',
        },
        onSubmit: (values) => {
            console.log('Форма:', values);
            onClose();
        },
    });

    return (
        <div className="contact-form-container">
            <h2>Добавить новый контакт</h2>
            <form onSubmit={formik.handleSubmit}>
                <label>
                    Имя:
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                </label>
                <br />
                <label>
                    Фамилия:
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        onChange={formik.handleChange}
                        value={formik.values.surname}
                    />
                </label>
                <br />
                <label>
                    Телефон:
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                    />
                </label>
                <br />
                <button type="submit">Сохранить</button>
                <button type="button" onClick={onClose}>Отмена</button>
            </form>
        </div>
    );
}
