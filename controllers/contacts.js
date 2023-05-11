const { Contact } = require("./../models/contact");

const { ctrlWrapper } = require("./../helpers/index");

const listContacts = async (req, res) => {
  const data = await Contact.find();
  res.json(data);
};

const addContact = async (req, res) => {
  const data = await Contact.create(req.body);
  res.status(201).json(data);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  addContact: ctrlWrapper(addContact),
};
