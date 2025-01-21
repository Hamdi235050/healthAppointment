import React from "react";
import { createUseStyles } from "react-jss";
import { Star } from "lucide-react";

const useStyles = createUseStyles({
  section: {
    padding: "4rem 0",
    backgroundColor: "#f9fafb",
  },
  container: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "0 1rem",
  },
  header: {
    textAlign: "center",
    marginBottom: "3rem",
  },
  title: {
    fontSize: "1.875rem",
    fontWeight: "bold",
    color: "#111827",
    marginBottom: "1rem",
  },
  subtitle: {
    color: "#4b5563",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "2rem",
    "@media (min-width: 768px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
  card: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "0.75rem",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  },
  stars: {
    display: "flex",
    marginBottom: "1rem",
  },
  star: {
    color: "#fbbf24",
    fill: "#fbbf24",
  },
  text: {
    color: "#4b5563",
    marginBottom: "1rem",
  },
  name: {
    fontWeight: 600,
  },
});

const testimonials = [
  {
    name: "Anis L.",
    text: "Une équipe médicale très professionnelle et à l'écoute. Je recommande vivement !",
  },
  {
    name: "Amine D.",
    text: "Excellent suivi médical. Les médecins prennent le temps d'expliquer et de répondre à toutes les questions.",
  },
  {
    name: "Mohamed M.",
    text: "La prise de rendez-vous en ligne est très pratique. Cabinet moderne et bien équipé.",
  },
];

export default function Testimonials() {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div className={classes.header}>
          <h2 className={classes.title}>Ce que disent nos patients</h2>
          <p className={classes.subtitle}>
            La satisfaction de nos patients est notre meilleure récompense
          </p>
        </div>

        <div className={classes.grid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={classes.card}>
              <div className={classes.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={classes.star} size={16} />
                ))}
              </div>
              <p className={classes.text}>{testimonial.text}</p>
              <p className={classes.name}>{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
