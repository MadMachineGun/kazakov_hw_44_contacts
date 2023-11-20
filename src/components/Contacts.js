import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ContactForm from './ContactForm';
import './contacts.scss';

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => setContacts(response.data))
            .catch(error => console.error('Error fetching contacts:', error));
    }, []);

    const handleDelete = (contactId) => {
        console.log(`Deleting contact with ID: ${contactId}`);
        setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
    };

    const handleAddContact = (newContact) => {
        // Add contact logic
        // Note: This is a placeholder, you need to implement the actual logic to add a contact
        console.log('Adding new contact:', newContact);
        setContacts(prevContacts => [...prevContacts, newContact]);
    };

    const handleShowForm = () => {
        setShowForm(true);
    };

    const handleHideForm = () => {
        setShowForm(false);
    };

    return (
        <div className="main-page-container">
            <h2>Contacts</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {contacts.map(contact => (
                    <tr key={contact.id}>
                        <td>{contact.name}</td>
                        <td>{contact.username}</td>
                        <td>{contact.phone}</td>
                        <td>
                            <button onClick={() => handleDelete(contact.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                <button onClick={handleShowForm}>Add contact</button>
            </div>
            {showForm && <ContactForm onClose={handleHideForm} onAddContact={handleAddContact}/>}
        </div>
    );
}

