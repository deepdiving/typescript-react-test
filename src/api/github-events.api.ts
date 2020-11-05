import {GithubEvent, GithubIssue} from "./github-events.model";
import axios from "axios";
import {useQuery} from "react-query";

export function useGithubIssueComments(props: {user: string, repo: string}) {
    
    // Task 1
    // const url = `/networks/microsoft/TypeScript/events?per_page=100`

    // Task 2
    const url = `/networks/${props.user}/${props.repo}/events?per_page=100`

    // Task 3 (You can see the output design)

    return useQuery<GithubIssue[], Error>(url, () =>
        axios.get(url).then((res) => mapResult(res.data))
    , {
        enabled: false
    })
}

export function mapResult(data: GithubEvent[]): GithubIssue[] {

    // Task 1
    let commentEvents = data.filter(GithubEvent => GithubEvent.type === "IssueCommentEvent");

    let githubIssues: Array<GithubIssue> = []

    const handleIssues = (event: GithubEvent) => {
        for(let i=0; i<githubIssues.length; i++ ) {
            if(githubIssues[i].id === event.payload.issue.id) {
                githubIssues[i].comments = [
                    ...githubIssues[i].comments,
                    {
                        id: event.payload.comment.id,
                        created_at: event.payload.comment.created_at,
                        body: event.payload.comment.body,
                        user: {
                            id: event.payload.comment.user.id,
                            login: event.payload.comment.user.login,
                        }
                    }
                ]
                return true
            }
        }
        githubIssues.push({
            id: event.payload.issue.id,
            created_at: event.payload.issue.created_at,
            title: event.payload.issue.title,
            body: event.payload.issue.body,
            user: {
                id: event.payload.issue.user.id,
                login: event.payload.issue.user.login,
            },
            comments: [
                {
                    id: event.payload.comment.id,
                    created_at: event.payload.comment.created_at,
                    body: event.payload.comment.body,
                    user: {
                        id: event.payload.comment.user.id,
                        login: event.payload.comment.user.login,
                    },
                }
            ]
        })
    }

    commentEvents.map(handleIssues);

    return githubIssues
}
