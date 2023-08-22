import React, { useState, useEffect } from 'react';
import { TAddRemoveButtons } from './types';

export const AddRemoveButtons = ({
  onDeleteList,
  activeList,
  addNewList,
  activeTodoList
}: TAddRemoveButtons) => {
  const [isDeleteListModalOpen, setIsDeleteListModalOpen] =
    useState<boolean>(false);
  const [isAddListModalOpen, setIsAddListModalOpen] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState('');

  const closeDeleteModal = () => {
    setIsDeleteListModalOpen(false);
  };

  const closeAddModal = () => {
    if (activeList) setIsAddListModalOpen(false);
  };

  const openAddModal = () => {
    setIsAddListModalOpen(true);
  };

  useEffect(() => {
    if (!activeList) {
      openAddModal();
    }
  }, [activeList]);

  const removeThisList = () => {
    setIsDeleteListModalOpen(true);
  };

  const onModalDeleteButton = () => {
    onDeleteList();
    closeDeleteModal();
  };

  const onAddTodolistButton = () => {
    addNewList(inputValue);
    setInputValue('');
    closeAddModal();
  };
  return (
    <>
      <div className="add-remove-list-buttons">
        <div
          className="add-new-list-button"
          title="Add new list"
          onClick={openAddModal}
        >
          +
        </div>
        <div
          className={`remove-list-button${
            activeTodoList?.placeHolder !== null ? '-inactive' : ''
          }`}
          title="Remove this list"
          onClick={removeThisList}
        ></div>
      </div>

      {isDeleteListModalOpen && (
        <div className="modal" onClick={closeDeleteModal}>
          <div
            className="modal-window"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <button
              className="cancel-todolist-button"
              onClick={closeDeleteModal}
            >
              ✖
            </button>
            <p className="delete-todolist-title">
              Are you sure want to delete this active to do list?
            </p>
            <button
              className="delete-todolist-button"
              onClick={onModalDeleteButton}
            >
              Yes, delete it!
            </button>
          </div>
        </div>
      )}

      {isAddListModalOpen && (
        <div
          className={`modal${activeList ? '' : ' bg-black'}`}
          onClick={closeAddModal}
        >
          <div
            className="modal-window"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <button className="cancel-todolist-button" onClick={closeAddModal}>
              ✖
            </button>
            <p className="add-todolist-title">New todolist title:</p>
            <input
              value={inputValue}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setInputValue(event.target.value)
              }
              className="add-todolist-input"
              placeholder="New title:"
            />
            <div className="add-buttons">
              <button className="add-todolist-button" onClick={closeAddModal}>
                Cancel
              </button>
              <button
                disabled={!inputValue || inputValue.trim() === ''}
                className="add-todolist-button"
                onClick={onAddTodolistButton}
              >
                Add new todo list
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
