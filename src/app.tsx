import React, {useState, MouseEvent, Component} from 'react';
import * as s from "./app.styles";
import {useGithubIssueComments} from "./api/github-events.api";
import Moment from 'moment';
import Swal from 'sweetalert2';


function App() {

    const [ user, setUser ] = useState<string>('');
    const [ repo, setRepo ] = useState<string>('');
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

    function getDate(date: string): string {
        let years = Moment().diff(date, 'years');
        if(years > 0) {
            return years + " Years ago";
        }
        let months = Moment().diff(date, 'months');
        if(months > 0) {
            return months + " Months ago";
        }
        let days = Moment().diff(date, 'days');
        if(days > 0) {
            return days + " Days ago";
        }
        let hours = Moment().diff(date, 'hours');
        if(hours > 0) {
            return hours + " Hours ago";
        }
        let minutes = Moment().diff(date, 'minutes');
        if(minutes > 0) {
            return minutes + " Minutes ago";
        }
        let seconds = Moment().diff(date, 'seconds');
        return seconds + " Seconds ago";
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
                <div key={issue.id} style={{marginBottom: 80}}>
                    <s.issuer_title>{issue.title}</s.issuer_title>
                    <s.issuer_sub_title> By <b>{issue.user.login} • </b>{getDate(issue.created_at)}</s.issuer_sub_title>
                    <s.issuer_body>
                       <s.pre>
                           {issue.body}
                       </s.pre>
                        </s.issuer_body>
                    <s.comment_count>{issue.comments.length} {issue.comments.length == 0 ? ("Comment"): ("Comments")}</s.comment_count>
                    {issue.comments.map((comment: any) =>
                        <s.comment_body key={comment.id}>
                            <s.comment_author>{comment.user.login} • {getDate(comment.created_at)}</s.comment_author>
                            <s.comment_body_item>
                                <s.pre>{comment.body}</s.pre>
                            </s.comment_body_item>
                        </s.comment_body>
                    )}
                </div>
            ))}

        </s.container>
    );
}

export default App;
