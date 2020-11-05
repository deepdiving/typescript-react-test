import React, {useState} from "react";
import * as s from "../app.styles";
import Moment from "moment";
import ReactMarkdown from "react-markdown";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';


function IssueDetails(props: any) {

    const [collapsed , setCollapsed] = useState<boolean>(true);

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



    const useStylesBootstrap = makeStyles((theme) => ({
        arrow: {
            color: theme.palette.common.black,
        },
        tooltip: {
            backgroundColor: theme.palette.common.black,
            fontSize: 16,
            lineHeight: "24px"
        },
    }));

    function getDateFormat(date: string): string {
        return Moment(date).format("DD MMM YYYY HH:mm")
    }

    function BootstrapTooltip(props: any) {
        const classes = useStylesBootstrap();
        return <Tooltip arrow classes={classes} {...props} />;
    }


    return (
        <React.Fragment>
            <s.issuer_area key={props.issue.id} className={ collapsed ? "collapsed" : "" }>
                <s.issuer_title>{props.issue.title}</s.issuer_title>
                <s.issuer_sub_title> By <b>{props.issue.user.login} • </b> <BootstrapTooltip title={getDateFormat(props.issue.created_at)} placement="top"><span>{getDate(props.issue.created_at)}</span></BootstrapTooltip>
                    </s.issuer_sub_title>
                <s.issuer_body>
                    <ReactMarkdown>
                        {props.issue.body}
                    </ReactMarkdown>
                </s.issuer_body>
                <s.comment_count>{props.issue.comments.length} {props.issue.comments.length == 0 ? ("Comment"): ("Comments")}</s.comment_count>
                {props.issue.comments.map((comment: any) =>
                    <s.comment_body key={comment.id}>
                        <s.comment_author>{comment.user.login} •  <BootstrapTooltip title={getDateFormat(comment.created_at)} placement="top"><span>{getDate(comment.created_at)}</span></BootstrapTooltip></s.comment_author>
                        <s.comment_body_item>
                            <ReactMarkdown>{comment.body}</ReactMarkdown>
                        </s.comment_body_item>
                    </s.comment_body>
                )}
            </s.issuer_area>
            { collapsed && (
                <React.Fragment>
                    <s.collapsed_action onClick={() => setCollapsed(false)}>
                        <a >{props.issue.comments.length} {props.issue.comments.length == 0 ? ("Comment"): ("Comments")} • Expand Issue</a>
                    </s.collapsed_action>
                    <s.collapsed_area/>
                </React.Fragment>
            )}
            { collapsed || (
                <s.collapse_div onClick={() => setCollapsed(true)}>
                    <s.collapse_btn >Collapse issue</s.collapse_btn>
                </s.collapse_div>
            )}
        </React.Fragment>
    )
}

export default IssueDetails

