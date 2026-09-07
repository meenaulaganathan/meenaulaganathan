import { motion } from "framer-motion";
import { Github, Linkedin, Loader2, Mail, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { profile } from "@/data/portfolio";
import { Reveal, RevealGroup, fadeUp, slideLeft, slideRight } from "./motion-primitives";
import { ActionButton, SectionHeading, SectionShell } from "./ui-bits";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const inputClass =
  "w-full rounded-xl border border-input bg-secondary/40 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/70 focus:bg-secondary/70";

export function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  const validate = () => {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (values.message.trim().length < 10) next.message = "Message should be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);

    // No backend is connected yet, so the form opens the visitor's mail client
    // with the message pre-filled — a real action, not a fake success state.
    const subject = encodeURIComponent(`Portfolio enquiry from ${values.name}`);
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    window.setTimeout(() => {
      setSending(false);
      toast.success("Your email client is opening with the message ready to send.");
    }, 700);
  };

  const fields = [
    { name: "name", label: "Name", type: "text", placeholder: "Your full name" },
    { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  ] as const;

  return (
    <SectionShell id="contact">
      <SectionHeading
        label="Contact"
        title="Let's build"
        accent="something together"
        description="Open to software and backend developer roles, internships and collaboration on interesting projects."
      />

      <div className="relative mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <RevealGroup className="grid gap-4 self-start">
          <motion.a
            variants={slideLeft}
            whileHover={{ y: -5 }}
            href={`mailto:${profile.email}`}
            className="glass card-glow flex items-center gap-4 rounded-2xl p-5"
          >
            <span className="bg-brand inline-flex size-11 items-center justify-center rounded-xl text-primary-foreground">
              <Mail className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold">Email</span>
              <span className="block text-sm text-muted-foreground">{profile.email}</span>
            </span>
          </motion.a>

          <motion.a
            variants={fadeUp}
            whileHover={{ y: -5 }}
            href="https://www.linkedin.com/in/meena-u-331169259/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass card-glow flex items-center gap-4 rounded-2xl p-5"
          >
            <span className="glass inline-flex size-11 items-center justify-center rounded-xl">
              <Linkedin className="size-5 text-accent" />
            </span>
            <span>
              <span className="block text-sm font-semibold">LinkedIn</span>
              <span className="block text-sm text-muted-foreground">Connect with me</span>
            </span>
          </motion.a>

          <motion.a
            variants={fadeUp}
            whileHover={{ y: -5 }}
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass card-glow flex items-center gap-4 rounded-2xl p-5"
          >
            <span className="glass inline-flex size-11 items-center justify-center rounded-xl">
              <Github className="size-5 text-accent" />
            </span>
            <span>
              <span className="block text-sm font-semibold">GitHub</span>
              <span className="block text-sm text-muted-foreground">See my code</span>
            </span>
          </motion.a>
        </RevealGroup>

        <Reveal variants={slideRight}>
          <form onSubmit={handleSubmit} noValidate className="glass rounded-3xl p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="mb-2 block font-mono text-xs tracking-widest text-muted-foreground uppercase"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.name}
                    placeholder={field.placeholder}
                    value={values[field.name]}
                    onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                    aria-invalid={Boolean(errors[field.name])}
                    className={inputClass}
                  />
                  {errors[field.name] && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-xs text-destructive"
                    >
                      {errors[field.name]}
                    </motion.p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5">
              <label
                htmlFor="message"
                className="mb-2 block font-mono text-xs tracking-widest text-muted-foreground uppercase"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me about the role or project..."
                value={values.message}
                onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                aria-invalid={Boolean(errors.message)}
                className={`${inputClass} resize-none`}
              />
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xs text-destructive"
                >
                  {errors.message}
                </motion.p>
              )}
            </div>

            <div className="mt-7">
              <ActionButton type="submit" disabled={sending}>
                {sending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
                Send Message
              </ActionButton>
            </div>
          </form>
        </Reveal>
      </div>
    </SectionShell>
  );
}
