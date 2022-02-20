import React, { useState, useEffect, useContext } from 'react'
import { getAllComments, saveComment } from '../services/comments.service';

export const CommentsContext = React.createContext({ comments: [] })

export const CommentsContextProvider = (props) => {
    const [comments, setComments] = useState();
    const [selectedComment, setSelectedComment] = useState();

    useEffect(() => {
        fetchComments()
    }, [])

    useEffect(() => {
        if (!selectedComment && comments) {
            setSelectedComment(comments[0])
        }
    }, [comments])

    const fetchComments = () => {
        getAllComments(props.courseId).then(res => {
            setComments(res?.data?.filter(x => x.courseId == props.courseId))
        })
    }
    const submitComment = comment => {
        saveComment(comment).then(res => {
            setSelectedComment(res?.data)
        })
        fetchComments()
    }

    return <CommentsContext.Provider value={{
        courseId: props.courseId,
        comments: comments,
        fetchComments: fetchComments,
        selectedComment: selectedComment,
        setSelectedComment: setSelectedComment,
        submitComment: submitComment
    }}>
        {props.children}
    </CommentsContext.Provider>
}