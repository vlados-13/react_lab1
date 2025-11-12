import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ModalPortal from "./ModalPortal";
import { useSettings } from "../context/SettingsContext.jsx";
import styles from "./SettingsModal.module.css";

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
      <div className={styles.modalOverlay}>
        <div className={styles.modalCard}>
          <h2>Game Settings</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.settingsForm}>
            <label className={styles.field}>
              <span>Difficulty</span>
              <select {...register("difficulty")}>
                <option value="easy">Easy</option>
                <option value="normal">Normal</option>
                <option value="hard">Hard</option>
              </select>
            </label>

            <div className={styles.modalActions}>
              <button type="button" onClick={onClose}>Cancel</button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
}


