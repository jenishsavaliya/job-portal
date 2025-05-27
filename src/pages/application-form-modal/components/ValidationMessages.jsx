import React from "react";
import Icon from "components/AppIcon";

const ValidationMessages = ({ message, type = "error" }) => {
  const getIconAndColor = () => {
    switch (type) {
      case "success":
        return { icon: "CheckCircle", color: "text-success" };
      case "warning":
        return { icon: "AlertTriangle", color: "text-warning" };
      case "info":
        return { icon: "Info", color: "text-info" };
      default:
        return { icon: "AlertCircle", color: "text-error" };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <div className={`flex items-center space-x-2 mt-2 ${color}`}>
      <Icon name={icon} size={16} />
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default ValidationMessages;