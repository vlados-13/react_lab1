import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ModalPortal from "./ModalPortal";
import { useSettings } from "../context/SettingsContext.jsx";

export default function SettingsModal({ isOpen, onClose }) {
  const { settings, setDifficulty } = useSettings();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { difficulty: settings.difficulty },
  });

  useEffect(() => {
    reset(settings);
  }, [settings, reset]);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    setDifficulty(data.difficulty);
    onClose?.();
  };

  return (
    <ModalPortal>
      <div className="modal-overlay">
        <div className="modal-card">
          <h2>Game Settings</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="settings-form">
            <label className="field">
              <span>Difficulty</span>
              <select {...register("difficulty")}>
                <option value="easy">Easy</option>
                <option value="normal">Normal</option>
                <option value="hard">Hard</option>
              </select>
            </label>

            <div className="modal-actions">
              <button type="button" onClick={onClose}>Cancel</button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
}


