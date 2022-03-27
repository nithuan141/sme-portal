import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

export const CourseForm = ({ handleChange, onFileUpload, onFileChange, course, uploadInProgress }) => {
    const { title, descriptions, tags, videoURL, thumbanilURL, durationMinutes, isPublished } = course
    return <Form>
        <FormGroup>
            <Label for="title">Title</Label>
            <Input
                id="title"
                name="title"
                placeholder="title"
                value={title}
                type="text"
                onChange={handleChange}
            />
        </FormGroup>
        <FormGroup>
            <Label for="descriptions">Description</Label>
            <Input
                id="descriptions"
                name="descriptions"
                placeholder="descriptions"
                type="textarea"
                value={descriptions}
                onChange={handleChange}
            />
        </FormGroup>
        <FormGroup>
            <Label for="tags">Tags (comma seperated)</Label>
            <Input
                id="tags"
                name="tags"
                placeholder="tags"
                type="text"
                value={tags}
                onChange={handleChange}
            />
        </FormGroup>
        <FormGroup>
            <Label for="videoURL">Video URL</Label>
            <Input
                id="videoURL"
                name="videoURL"
                placeholder="Video URL"
                type="text"
                value={videoURL}
                onChange={handleChange}
            />
            <div style={{ paddingTop: "8px" }}>
                <input type="file" onChange={onFileChange} />
                <Button primary onClick={(e) => {
                    e.preventDefault()
                    onFileUpload('videoURL')
                }
                }>{uploadInProgress ? 'Uploading....' : 'Upload'}</Button>
            </div>
        </FormGroup>
        <FormGroup>
            <Label for="thumbanilURL">Thumbanil URL</Label>
            <Input
                id="thumbanilURL"
                name="thumbanilURL"
                type="text"
                placeholder="Thumbanil URL"
                value={thumbanilURL}
                onChange={handleChange}
            />
            <div style={{ paddingTop: "8px" }}>
                <input type="file" onChange={onFileChange} />
                <Button primary onClick={(e) => {
                    e.preventDefault()
                    onFileUpload('thumbanilURL')
                }
                }>{uploadInProgress ? 'Uploading....' : 'Upload'}</Button>
            </div>
        </FormGroup>

        <FormGroup>
            <Label for="durationMinutes">Duration (Minutes)</Label>
            <Input
                id="durationMinutes"
                name="durationMinutes"
                type="number"
                min={1}
                placeholder="Duration (Minutes)"
                value={durationMinutes}
                onChange={handleChange}
            />
        </FormGroup>

        <FormGroup>
            <Label for="isPublished">Is Published</Label>
            <Input
                id="isPublished"
                name="isPublished"
                placeholder="Is Published"
                type="checkbox"
                value={isPublished}
                checked={isPublished}
                onChange={handleChange}
            />
        </FormGroup>
    </Form>
}