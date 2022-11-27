import React, { Component } from "react";
import css from "./App.module.css";
import { nanoid } from "nanoid";
import ContactForm from "./Components/ContactForm/ContactForm";
import Filter from "./Components/Filter/Filter";
import ContactList from "./Components/ContactList/ContactList";

class App extends Component {
	state = {
		contacts: [
			{ id: nanoid(), name: "Rosie Simpson", number: "459-12-56" },
			{ id: nanoid(), name: "Hermione Kline", number: "443-89-12" },
			{ id: nanoid(), name: "Eden Clements", number: "645-17-79" },
			{ id: nanoid(), name: "Annie Copeland", number: "227-91-26" },
		],
		filter: "",
	};

	checkContact = (newContact) => {
		const { contacts } = this.state;
		const isInBase = contacts.some((contact) => contact.name === newContact.name);
		return isInBase;
	};

	addContact = (newContact) => {
		const check = this.checkContact(newContact);
		if (!check) {
			const { contacts } = this.state;
			contacts.push(newContact);
			this.setState({ contacts: contacts });
		} else {
			alert(`${newContact.name} is alerdy in contacts`);
		}
	};

	changeFilterValue = (e) => {
		this.setState({ filter: e.target.value });
	};

	deleteUser = (e) => {
		const { contacts } = this.state;
		const filtered = contacts.filter((contact) => contact.id !== e.target.id);
		this.setState({ contacts: filtered });
	};

	render() {
		return (
			<div className={css["container"]}>
				<h1>Phonebook</h1>
				<ContactForm onSubmit={this.addContact}></ContactForm>

				<h2>Contacts</h2>
				<Filter changeHandler={this.changeFilterValue}></Filter>
				<ContactList
					filter={this.state.filter}
					contacts={this.state.contacts}
					deleteFunction={this.deleteUser}
				></ContactList>
			</div>
		);
	}
}

export default App;
