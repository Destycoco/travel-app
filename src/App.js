import { useState } from "react";
// const setOfItems = [
//   { description: "passport", quantity: 5, packed: false, id: 1 },
//   { description: "bags", quantity: 4, packed: false, id: 2 },
//   { description: "documents", quantity: 2, packed: true, id: 3 },
//   { description: "food", quantity: 7, packed: true, id: 4 },
//   { description: "documents", quantity: 2, packed: true, id: 5 },
//   { description: "documents", quantity: 2, packed: true, id: 6 },
// ];

function App() {
  const [items, setItems] = useState([]);
  function handleItem(item) {
    setItems((items) => [...items, item]);
    console.log(items);
  }
  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
    console.log(id);
  }
  function handleUpdate(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClear() {
    const confirmed = window.confirm(
      "Are you sure you want to delete the set of items"
    );
    if (confirmed) {
      setItems((items) => []);
    }
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleItem} />
      <List
        items={items}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onClear={handleClear}
      />
      <Footer items={items} />
    </div>
  );
}
function Logo() {
  return (
    <div className="">
      <h1>Far away</h1>
    </div>
  );
}
function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const newItem = { description, quantity, packed: false, id: Date.now() };

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    console.log(newItem);
    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <div className="add-form">
      <h3>What do you need for your trip ?</h3>
      <form action="" onSubmit={handleSubmit}>
        <select
          id=""
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (len, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          name="item"
          type="text"
          placeholder="item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="button">Add</button>
      </form>
    </div>
  );
}

const sortFunc = (items, sortBy) => {
  let sortedItems;
  if (sortBy === "input") {
    sortedItems = items;
  }
  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(Number(b.packed) - a.packed));
  }
  return sortedItems;
};

function List({ items, onDelete, onUpdate, onClear }) {
  const [sortBy, setSortBy] = useState("input");
  const sortedItems = sortFunc(items, sortBy);

  console.log(sortBy);
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          id=""
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
        <button onClick={onClear}>Clear list</button>
      </div>
    </div>
  );
}

function Item({ item, onDelete, onUpdate }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onUpdate(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button
        style={{ color: "red", fontSize: "25px" }}
        onClick={() => onDelete(item.id)}
      >
        X
      </button>
    </li>
  );
}

function Footer({ items }) {
  const itemLength = items.length;
  const itemPacked = items.filter((item) => item.packed).length;
  const percent = Math.round((itemPacked / itemLength) * 100);
  if (!itemLength) {
    return (
      <p className="stats">
        <em>Start adding some items</em>
      </p>
    );
  }
  return (
    <div className="stats">
      <em>
        {percent === 100
          ? "You got everything ready to go"
          : `You have ${itemLength} items on your list, and you already packed ${itemPacked} (${percent}%)`}
      </em>
    </div>
  );
}

export default App;
