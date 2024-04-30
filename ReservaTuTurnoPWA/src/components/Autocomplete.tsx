import cx from "classnames";
import { useCombobox } from "downshift";
import { useState } from "react";

export default function ComboBoxExample() {
  const books = [
    { id: "book-1", author: "Harper Lee", title: "To Kill a Mockingbird" },
    { id: "book-2", author: "Lev Tolstoy", title: "War and Peace" },
    { id: "book-3", author: "Fyodor Dostoyevsy", title: "The Idiot" },
  ];

  function getBooksFilter(inputValue) {
    const lowerCasedInputValue = inputValue.toLowerCase();

    return function booksFilter(book) {
      return (
        !inputValue ||
        book.title.toLowerCase().includes(lowerCasedInputValue) ||
        book.author.toLowerCase().includes(lowerCasedInputValue)
      );
    };
  }

  function ComboBox() {
    const [items, setItems] = useState(books);
    const [selectedItem, setSelectedItem] = useState(null);
    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      highlightedIndex,
      getItemProps,
    } = useCombobox({
      onInputValueChange({ inputValue }) {
        setItems(books.filter(getBooksFilter(inputValue)));
      },
      items,
      itemToString(item) {
        return item ? item.title : "";
      },
      selectedItem,
      onSelectedItemChange: ({ selectedItem: newSelectedItem }) =>
        setSelectedItem(newSelectedItem),
    });
    return (
      <div>
        <div className="flex w-72 flex-col gap-1">
          <label className="w-fit" {...getLabelProps()}>
            Choose your favorite book:
          </label>
          <div className="flex gap-0.5 bg-white shadow-sm">
            <input
              placeholder="Best book ever"
              className="w-full p-1.5"
              {...getInputProps()}
            />
            <button
              aria-label="toggle menu"
              className="px-2"
              type="button"
              {...getToggleButtonProps()}
            >
              {isOpen ? <>&#8593;</> : <>&#8595;</>}
            </button>
          </div>
        </div>
        <ul
          className={`absolute z-10 mt-1 max-h-80 w-72 overflow-scroll bg-white p-0 shadow-md ${
            !(isOpen && items.length) && "hidden"
          }`}
          {...getMenuProps()}
        >
          {isOpen &&
            items.map((item, index) => (
              <li
                className={cx(
                  highlightedIndex === index && "bg-blue-300",
                  selectedItem === item && "font-bold",
                  "flex flex-col px-3 py-2 shadow-sm",
                )}
                key={item.id}
                {...getItemProps({ item, index })}
              >
                <span>{item.title}</span>
                <span className="text-sm text-gray-700">{item.author}</span>
              </li>
            ))}
        </ul>
        <p className="font-semibold">
          {selectedItem
            ? `You have selected ${selectedItem.title} by ${selectedItem.author}.`
            : "Select a book!"}
        </p>
      </div>
    );
  }
  return <ComboBox />;
}
