export default function StatusPanel({ status, resetGame }) {
  return (
    <div className="status-panel">
      <h4><b>Game Status : </b></h4> <p className="status-text">{status}</p>
      <button className="reset" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}
