import { Award, Clock, Heart, Phone, Star, Users } from "lucide-react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  section: {
    padding: "4rem 0",
    backgroundColor: "white",
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
    maxWidth: 640,
    margin: "0 auto",
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
    backgroundColor: "#f9fafb",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    transition: "box-shadow 0.2s",
    "&:hover": {
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    },
  },
  icon: {
    color: "#2563eb",
    marginBottom: "1rem",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
    color: "#111827",
  },
  description: {
    color: "#4b5563",
  },
});

const services = [
  {
    icon: Heart,
    title: "Médecine générale",
    description: "Consultations et suivis médicaux pour toute la famille",
  },
  {
    icon: Users,
    title: "Pédiatrie",
    description: "Soins spécialisés pour les enfants de 0 à 18 ans",
  },
  {
    icon: Award,
    title: "Certificats médicaux",
    description: "Pour le sport, le travail ou les études",
  },
  {
    icon: Star,
    title: "Vaccinations",
    description:
      "Tous types de vaccins et mise à jour du carnet de vaccination",
  },
  {
    icon: Clock,
    title: "Consultations urgentes",
    description: "Prise en charge rapide pour les cas urgents",
  },
  {
    icon: Phone,
    title: "Téléconsultation",
    description: "Consultations à distance pour plus de flexibilité",
  },
];

export const Services = () => {
  const classes = useStyles();

  return (
    <div id="services" className={classes.section}>
      <div className={classes.container}>
        <div className={classes.header}>
          <h2 className={classes.title}>Nos Services</h2>
          <p className={classes.subtitle}>
            Une gamme complète de services médicaux pour répondre à tous vos
            besoins de santé
          </p>
        </div>

        <div className={classes.grid}>
          {services.map((service, index) => (
            <div key={index} className={classes.card}>
              <service.icon className={classes.icon} size={32} />
              <h3 className={classes.cardTitle}>{service.title}</h3>
              <p className={classes.description}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
