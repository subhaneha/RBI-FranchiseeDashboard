import { createBrowserHistory, History } from 'history';
interface ChildComponentProps {
    history: History
}
export const history: History = createBrowserHistory();