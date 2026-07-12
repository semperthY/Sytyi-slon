import { contacts } from "../data/contacts";

export default function Contacts() {
  return (
    <section
      id="contacts"
      className="bg-neutral-900 px-6 py-20 text-white"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-8 text-4xl font-bold">
          Контакты
        </h2>

        <p className="mb-4 text-lg text-neutral-300">
          📍 Адрес: {contacts.address}
        </p>

        <p className="mb-4 text-lg text-neutral-300">
          ☎️ Телефон: {contacts.phone}
        </p>

        <p className="mb-4 text-lg text-neutral-300">
          📧 Email: {contacts.email}
        </p>

        <p className="text-lg text-neutral-300">
          🕒 Часы работы: {contacts.hours}
        </p>
      </div>
    </section>
  );
}
