import React, { useState } from "react";

export default function App() {
  // Estado para armazenar a lista de tarefas do dia a dia
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Estudar programação e rever apontamentos",
      completed: false,
    },
    { id: 2, text: "Organizar o quarto e a mesa de trabalho", completed: true },
    { id: 3, text: "Ir ao supermercado comprar fruta", completed: false },
  ]);

  // Estado para controlar o texto do input
  const [inputTarefa, setInputTarefa] = useState("");

  // Estado para gerir o filtro atual (todas, pendentes, concluidas)
  const [filtro, setFiltro] = useState("todas");

  // Função para adicionar uma nova tarefa
  const adicionarTarefa = (e) => {
    e.preventDefault();
    if (!inputTarefa.trim()) return; // Impede adicionar tarefas vazias

    const novaTarefa = {
      id: Date.now(), // Gera um ID único baseado no tempo atual
      text: inputTarefa,
      completed: false,
    };

    setTasks([...tasks, novaTarefa]); // Adiciona a nova tarefa à lista existente
    setInputTarefa(""); // Limpa o campo de texto
  };

  // Função para alternar o estado de concluído/pendente
  const alternarConclusao = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // Função para eliminar uma tarefa da lista
  const eliminarTarefa = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Lógica para filtrar as tarefas na tela
  const tarefasFiltradas = tasks.filter((task) => {
    if (filtro === "pendentes") return !task.completed;
    if (filtro === "concluidas") return task.completed;
    return true; // "todas"
  });

  // Contador de tarefas pendentes
  const tarefasPendentes = tasks.filter((task) => !task.completed).length;

  return (
    <div className="todo-container">
      <header className="todo-header">
        <h1>A Minha Rotina</h1>
        <p>Gerenciador de tarefas diárias e compromissos.</p>
      </header>

      {/* Contador dinâmico */}
      <div className="task-counter">
        {tarefasPendentes === 1
          ? "1 tarefa pendente para hoje"
          : `${tarefasPendentes} tarefas pendentes para hoje`}
      </div>

      {/* Formulário para adicionar tarefas */}
      <form onSubmit={adicionarTarefa} className="todo-form">
        <input
          type="text"
          className="todo-input"
          placeholder="O que precisas de fazer hoje?"
          value={inputTarefa}
          onChange={(e) => setInputTarefa(e.target.value)}
        />
        <button type="submit" className="todo-btn">
          Adicionar
        </button>
      </form>

      {/* Botões de Filtro */}
      <div className="todo-filters">
        <button
          className={`filter-btn ${filtro === "todas" ? "active" : ""}`}
          onClick={() => setFiltro("todas")}
        >
          Todas
        </button>
        <button
          className={`filter-btn ${filtro === "pendentes" ? "active" : ""}`}
          onClick={() => setFiltro("pendentes")}
        >
          Pendentes
        </button>
        <button
          className={`filter-btn ${filtro === "concluidas" ? "active" : ""}`}
          onClick={() => setFiltro("concluidas")}
        >
          Concluídas
        </button>
      </div>

      {/* Lista de Tarefas Renderizada */}
      <ul className="todo-list">
        {tarefasFiltradas.map((task) => (
          <li key={task.id} className="todo-item">
            <div className="todo-item-left">
              <input
                type="checkbox"
                className="todo-checkbox"
                checked={task.completed}
                onChange={() => alternarConclusao(task.id)}
              />
              <span
                className={`todo-text ${task.completed ? "completed" : ""}`}
              >
                {task.text}
              </span>
            </div>
            <button
              className="delete-btn"
              onClick={() => eliminarTarefa(task.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      {/* Mensagem caso não existam tarefas no filtro selecionado */}
      {tarefasFiltradas.length === 0 && (
        <p className="empty-message">Não há tarefas aqui!</p>
      )}
    </div>
  );
}
