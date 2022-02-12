import React from "react";

export const Comments = () => {
    return <div className="comments mt-5">
    <div className="comments-box d-flex ">
      <div className="comments__user comments__user-big">KR</div>
      <textarea className="comments__comment-text" name="" id="" cols="30" rows="10" placeholder="Comments"></textarea>
    </div>
    <button className="sr-btn d-btn-add">Add</button>
    {/* <input type="file" className="comments__file" /> */}

    <div className="comments__messages">
      <div className="comments__message-box mt-3">
        <div className="comments__inner">
          <div className="comments__user comments__user-small">KR</div>
          <div className="comments__message">
            <p className="comments__head"><span>Kiran Raj</span>10 jan 2022</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.</p>
            <button className="comments__reply">Reply</button>

            <div className="comments__reply-box mt-2">
              <input type="text" className="comments__reply-input" />
              <button className="sr-btn d-btn-add ms-0 mt-sm-0 mt-2">Add</button>
            </div>
          </div>
        </div>
      </div>
      <div className="comments__message-box mt-3">
        <div className="comments__inner">
          <div className="comments__user comments__user-small">KR</div>
          <div className="comments__message">
            <p className="comments__head"><span>Kiran Raj</span>10 jan 2022</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        <div className="comments__inner">
          <div className="comments__user comments__user-small">KR</div>
          <div className="comments__message">
            <p className="comments__head"><span>Kiran Raj</span>10 jan 2022</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className="comments__inner">
            <div className="comments__user comments__user-small">KR</div>
            <div className="comments__message">
              <p className="comments__head"><span>Kiran Raj</span>10 jan 2022</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}