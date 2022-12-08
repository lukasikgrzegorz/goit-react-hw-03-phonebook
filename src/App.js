import React, { Component } from "react";
import css from "./App.module.css";
import ContactForm from "./Components/ContactForm/ContactForm";
import Filter from "./Components/Filter/Filter";
import ContactList from "./Components/ContactList/ContactList";

const KEY = "Contacts";

class App extends Component {
	state = {
		contacts: [],
		filter: "",
	};

	componentDidMount() {
		const savedContacts = JSON.parse(localStorage.getItem(KEY));
		savedContacts && this.setState({ contacts: savedContacts });
	}

	componentDidUpdate() {
		const { contacts } = this.state;
		localStorage.setItem(KEY, JSON.stringify(contacts));
	}

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
				<ContactForm onSubmit={this.addContact} />

				<h2>Contacts</h2>
				<Filter changeHandler={this.changeFilterValue} />
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
