import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  return (
    <HistoryContainer>
      <h1>History</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>20:00</td>
              <td>Há 2 meses</td>
              <td>
                <Status status="in_progress" />
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20:00</td>
              <td>Há 2 meses</td>
              <td>
                <Status status="done" />
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20:00</td>
              <td>Há 2 meses</td>
              <td>
                <Status status="cancelled" />
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20:00</td>
              <td>Há 2 meses</td>
              <td>
                <Status status="done" />
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20:00</td>
              <td>Há 2 meses</td>
              <td>
                <Status status="done" />
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
