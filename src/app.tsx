import React, {useState, MouseEvent, Component} from 'react';
import * as s from "./app.styles";
import {useGithubIssueComments} from "./api/github-events.api";
import Moment from 'moment';
import Swal from 'sweetalert2';
import IssueDetails from "./components/issue-details";

function App() {

    const [ user, setUser ] = useState<string>('microsoft');
    const [ repo, setRepo ] = useState<string>('TypeScript');
    const [ data, setData ] = useState<any>([]);

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {setUser(e.currentTarget.value)};
    const handleRepoChange = (e: React.ChangeEvent<HTMLInputElement>) => setRepo(e.currentTarget.value);


    const { refetch } = useGithubIssueComments({user: user, repo: repo});

    function handleFetch(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        Swal.fire({
            title: 'Loading ...',
            onBeforeOpen () {
                Swal.showLoading ()
            },
            onAfterClose () {
                Swal.hideLoading()
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false
        });
        refetch().then(result => {
            Swal.close()
            console.log(result)
            if(result === undefined ){
                Swal.fire(
                    'Error',
                    'Not Found',
                    'error'
                )
            }
            setData(result);

        })
    }

    return (
        <s.container>
            <s.header>Github Issues and Comments:</s.header>
            <s.form>
                <s.input type="text" value={user} onChange={handleUserChange} placeholder="user"></s.input>
                <s.separator>/</s.separator>
                <s.input type="text" value={repo} onChange={handleRepoChange} placeholder="repo"></s.input>
                <s.separator></s.separator>
                <s.button onClick={handleFetch}>Go Fetch</s.button>
            </s.form>

            {data?.map((issue: any) => (
                <IssueDetails issue={issue}/>
            ))}

        </s.container>
    );
}

export default App;
