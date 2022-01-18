import { useEffect, useRef, forwardRef } from "react";
import { WidgetInstance } from "friendly-challenge";

const FriendlyCaptcha = forwardRef(({ sitekey, doneCallback, errorCallback, startMode }, widget) => {
  const container = useRef();
  const _doneCallback = (solution) => {
    if (doneCallback) doneCallback(solution);
  };

  const _errorCallback = (err) => {
    if (errorCallback) errorCallback(err);
    console.error("There was an error when trying to solve the Friendly Captcha puzzle.", err);
  };

  useEffect(() => {
    if (!widget.current && container.current) {
      widget.current = new WidgetInstance(container.current, {
        startMode: startMode || "focus", // You could default to "auto" if you want to start even before interaction
        doneCallback: _doneCallback,
        errorCallback: _errorCallback,
      });
    }

    return () => {
      if (widget.current != undefined) widget.current.reset();
    };
  }, [container]);

  return <div ref={container} className="frc-captcha" data-sitekey={sitekey} />;
});

export default FriendlyCaptcha;
