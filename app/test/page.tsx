"use client";
import { message } from "antd";
import { useEffect } from "react";

const TestMessage: React.FC = () => {
  useEffect(() => {
    message.success("This is a test success message!");
  }, []);

  return <div>Test Component</div>;
};

export default TestMessage;
