export type ContactInfo = {
  github: string;
  phone: string;
  linkedin: string;
  email: string;
  /** Direct-download link (not the "view" page) so the button downloads immediately. */
  resumeUrl: string;
};

// Real, verified contact channels provided by Raza. Raza AI, the Contact
// section (Phase 7), and the footer all read from this single source.
export const CONTACT: ContactInfo = {
  github: "https://github.com/rsyedmuhammad428-cmd",
  linkedin: "https://www.linkedin.com/in/syed-muhammad-raza-zaidi-286957373/",
  phone: "+92 336-2296112",
  email: "rsyedmuhammad428@gmail.com",
  resumeUrl: "https://drive.google.com/uc?export=download&id=1KfSABtfibXyV80tTlTkeYiXzx5u5zBiw",
};
