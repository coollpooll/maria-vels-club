"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Shield,
  Star,
  Clock3,
  MapPin,
  Sparkles,
  FileText,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const mariaImage = "/maria.jpg";
const cloudpaymentsUrl = "https://example.com";

const sections = [
  { id: "program", label: "О программе" },
  { id: "for-whom", label: "Для кого" },
  { id: "benefits", label: "Что входит" },
  { id: "how", label: "Как проходит" },
  { id: "casting", label: "Кастинг" },
  { id: "maria", label: "Мария" },
  { id: "faq", label: "FAQ" },
];

const faqItems = [
  {
    q: "Где проходит обучение?",
    a: "Обучение проходит офлайн в Москве, в студии в центре города.",
  },
  {
    q: "Сколько длится программа?",
    a: "Программа длится 7 дней, по 2 часа в день.",
  },
  {
    q: "Можно ли оплатить частями?",
    a: "Да, доступен вариант оплаты частями.",
  },
  {
    q: "Что происходит после оплаты?",
    a: "После оплаты за вами фиксируется место, и с вами связываются для подтверждения участия и организационных деталей.",
  },
  {
    q: "Что дает прохождение обучения?",
    a: "После завершения программы участница гарантированно получает выход на кастинг с пометкой «Ученица Марии Вельс».",
  },
  {
    q: "Можно ли сначала задать вопросы?",
    a: "Да, для этого на сайте есть кнопка «Оставить заявку».",
  },
  {
    q: "Нужно ли подтверждать согласие с условиями перед оплатой?",
    a: "Да, перед переходом к оплате необходимо подтвердить согласие с Правилами участия, Программой обучения, Условиями оплаты и возврата, а также с обработкой персональных данных.",
  },
];

function Glow({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-40 ${className}`}
      style={{
        background:
          "radial-gradient(circle, rgba(255,105,180,0.38) 0%, rgba(255,105,180,0.18) 30%, rgba(255,105,180,0.05) 58%, transparent 74%)",
      }}
    />
  );
}

function SectionTitle({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-pink-200/80">
          <Sparkles className="h-3.5 w-3.5" />
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
        {title}
      </h2>
      {text ? <p className="mt-4 text-sm leading-7 text-zinc-300 md:text-base">{text}</p> : null}
    </div>
  );
}

function SilhouetteVisual({
  variant = 1,
  className = "",
}: {
  variant?: 1 | 2 | 3;
  className?: string;
}) {
  const gradients = {
    1: "from-zinc-700 via-zinc-800 to-zinc-950",
    2: "from-zinc-600 via-zinc-800 to-zinc-950",
    3: "from-zinc-700 via-zinc-900 to-black",
  };

  return (
    <div className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[variant]}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,120,190,0.18),transparent_26%),radial-gradient(circle_at_70%_75%,rgba(255,120,190,0.16),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_32%)]" />
      <div className="absolute -right-10 top-10 h-72 w-40 rounded-full bg-zinc-700/70 blur-sm" />
      <div className="absolute bottom-0 right-6 h-[78%] w-44 rounded-t-[7rem] bg-gradient-to-t from-zinc-900 to-zinc-700/80 shadow-[0_0_60px_rgba(0,0,0,0.55)]" />
      <div className="absolute bottom-0 right-[4.7rem] h-24 w-24 rounded-full bg-zinc-700/90" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-zinc-300/75">
        Graphite visual
      </div>
    </div>
  );
}

function Metric({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <Card className="rounded-[1.5rem] border-white/10 bg-white/5 text-white shadow-none backdrop-blur-sm">
      <CardContent className="p-5">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink-400/15 text-pink-200">
          <Icon className="h-5 w-5" />
        </div>
        <div className="text-lg font-medium">{title}</div>
        <p className="mt-2 text-sm leading-6 text-zinc-300">{text}</p>
      </CardContent>
    </Card>
  );
}

function CTAButton({
  children,
  onClick,
  variant = "default",
  className = "",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline";
  className?: string;
  disabled?: boolean;
}) {
  const styles =
    variant === "outline"
      ? "border border-white/15 bg-white/5 text-white hover:bg-white/10"
      : "bg-gradient-to-r from-pink-300 via-pink-400 to-fuchsia-400 text-black hover:opacity-95";

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`h-12 rounded-full px-6 text-sm font-medium shadow-[0_12px_40px_rgba(255,105,180,0.18)] transition-all ${styles} ${
        disabled ? "cursor-not-allowed opacity-60" : ""
      } ${className}`}
    >
      {children}
    </Button>
  );
}

function DocLink({ href = "#", children }: { href?: string; children: React.ReactNode }) {
  return (
    <a href={href} className="underline decoration-white/20 underline-offset-4 hover:decoration-pink-300">
      {children}
    </a>
  );
}

function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [docs, setDocs] = useState(false);
  const [pd, setPd] = useState(false);
  const [msg, setMsg] = useState(false);
  const canGo = docs && pd && msg;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#101012] text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,120,190,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,120,190,0.08),transparent_22%)]" />
            <div className="relative p-6 md:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 text-xs uppercase tracking-[0.3em] text-pink-200/75">
                    Бронирование участия
                  </div>
                  <h3 className="text-2xl font-semibold">MARIA VELS | CLUB</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    Вы бронируете участие в программе MARIA VELS | CLUB
                  </p>
                  <p className="text-sm leading-6 text-zinc-300">
                    7 дней по 2 часа · офлайн в Москве · стоимость 50 000 ₽
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-300 transition hover:bg-white/10"
                >
                  Закрыть
                </button>
              </div>

              <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <label className="flex items-start gap-3 text-sm leading-6 text-zinc-200">
                  <Checkbox checked={docs} onCheckedChange={(v) => setDocs(Boolean(v))} className="mt-1 border-white/20" />
                  <span>
                    Я ознакомлена и принимаю <DocLink href="#rules">Правила участия</DocLink>,{" "}
                    <DocLink href="#program-doc">Программу обучения</DocLink> и{" "}
                    <DocLink href="#payments">Условия оплаты и возврата</DocLink>.
                  </span>
                </label>
                <label className="flex items-start gap-3 text-sm leading-6 text-zinc-200">
                  <Checkbox checked={pd} onCheckedChange={(v) => setPd(Boolean(v))} className="mt-1 border-white/20" />
                  <span>
                    Я ознакомлена с <DocLink href="#privacy">Политикой в отношении обработки персональных данных</DocLink> и даю согласие на обработку моих персональных данных.
                  </span>
                </label>
                <label className="flex items-start gap-3 text-sm leading-6 text-zinc-200">
                  <Checkbox checked={msg} onCheckedChange={(v) => setMsg(Boolean(v))} className="mt-1 border-white/20" />
                  <span>
                    Я даю согласие на получение информационных сообщений по указанным мной контактным данным.
                  </span>
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-zinc-400">
                  Кнопка активируется только после подтверждения условий.
                </p>
                <CTAButton
                  className="min-w-[210px]"
                  disabled={!canGo}
                  onClick={() => canGo && (window.location.href = cloudpaymentsUrl)}
                >
                  Перейти к оплате
                  <ArrowRight className="ml-2 h-4 w-4" />
                </CTAButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function LeadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [pd, setPd] = useState(false);
  const [msg, setMsg] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const canSend = pd && msg;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#101012] text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,120,190,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,120,190,0.08),transparent_24%)]" />
            <div className="relative p-6 md:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 text-xs uppercase tracking-[0.3em] text-pink-200/75">
                    Оставить заявку
                  </div>
                  <h3 className="text-2xl font-semibold">Оставить заявку</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    Оставьте контакты, и мы свяжемся с вами, чтобы обсудить участие и ответить на вопросы.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-300 transition hover:bg-white/10"
                >
                  Закрыть
                </button>
              </div>

              {submitted ? (
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-sm leading-7 text-zinc-200">
                  Заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.
                </div>
              ) : (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input placeholder="Имя" className="h-12 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-zinc-500" />
                    <Input placeholder="Телефон" className="h-12 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-zinc-500" />
                    <Input placeholder="Telegram" className="h-12 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-zinc-500" />
                    <Input placeholder="Email" className="h-12 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-zinc-500" />
                  </div>
                  <Textarea placeholder="Комментарий" className="mt-4 min-h-[120px] rounded-[1.5rem] border-white/10 bg-white/5 text-white placeholder:text-zinc-500" />

                  <div className="mt-5 space-y-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <label className="flex items-start gap-3 text-sm leading-6 text-zinc-200">
                      <Checkbox checked={pd} onCheckedChange={(v) => setPd(Boolean(v))} className="mt-1 border-white/20" />
                      <span>
                        Я ознакомлена с <DocLink href="#privacy">Политикой в отношении обработки персональных данных</DocLink> и даю согласие на обработку моих персональных данных.
                      </span>
                    </label>
                    <label className="flex items-start gap-3 text-sm leading-6 text-zinc-200">
                      <Checkbox checked={msg} onCheckedChange={(v) => setMsg(Boolean(v))} className="mt-1 border-white/20" />
                      <span>
                        Я даю согласие на получение информационных сообщений по указанным мной контактным данным.
                      </span>
                    </label>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-5 text-zinc-400">
                      Кнопка неактивна, пока не отмечены обязательные поля.
                    </p>
                    <CTAButton
                      className="min-w-[210px]"
                      disabled={!canSend}
                      onClick={() => canSend && setSubmitted(true)}
                    >
                      Отправить заявку
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </CTAButton>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function FAQItem({
  q,
  a,
  isOpen,
  onClick,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 backdrop-blur-sm">
      <button onClick={onClick} className="flex w-full items-center justify-between gap-4 p-5 text-left text-white">
        <span className="text-base font-medium md:text-lg">{q}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 transition ${isOpen ? "rotate-180 text-pink-200" : "text-zinc-400"}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm leading-7 text-zinc-300">{a}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function MariaVelsClubLanding() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const nav = useMemo(() => sections, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <div className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-left">
            <div className="text-xs uppercase tracking-[0.35em] text-pink-200/80">MARIA VELS</div>
            <div className="text-sm text-zinc-300">CLUB</div>
          </button>

          <div className="hidden items-center gap-6 md:flex">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm text-zinc-300 transition hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <CTAButton variant="outline" className="hidden sm:inline-flex" onClick={() => setLeadOpen(true)}>
              Оставить заявку
            </CTAButton>
            <CTAButton onClick={() => setBookingOpen(true)}>Забронировать место</CTAButton>
          </div>
        </div>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} />

      <main className="overflow-hidden pt-20">
        <section className="relative">
          <Glow className="-left-24 top-10 h-96 w-96" />
          <Glow className="right-0 top-40 h-[28rem] w-[28rem]" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-200/15 bg-pink-200/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-pink-100/85">
                <Shield className="h-3.5 w-3.5" />
                Индивидуальное обучение для девушек в Москве
              </div>

              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] text-white md:text-7xl">
                Харизма, подача и подготовка к кастингам в{" "}
                <span className="bg-gradient-to-r from-pink-200 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
                  премиальные иммерсивные проекты
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
                7 дней по 2 часа. Офлайн в центре Москвы. Стоимость: 50 000 ₽. Возможна оплата частями. После прохождения обучения участница гарантированно получает выход на кастинг с пометкой «Ученица Марии Вельс».
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Формат</div>
                  <div className="mt-2 text-lg font-medium">Индивидуально</div>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Стоимость</div>
                  <div className="mt-2 text-lg font-medium">50 000 ₽</div>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Оплата</div>
                  <div className="mt-2 text-lg font-medium">Частями доступна</div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div>
                  <CTAButton className="h-14 px-7 text-base" onClick={() => setBookingOpen(true)}>
                    Забронировать место
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </CTAButton>
                  <p className="mt-2 text-xs text-zinc-400">Для тех, кто готов зафиксировать участие сразу</p>
                </div>
                <div>
                  <CTAButton variant="outline" className="h-14 px-7 text-base" onClick={() => setLeadOpen(true)}>
                    Оставить заявку
                  </CTAButton>
                  <p className="mt-2 text-xs text-zinc-400">Если хотите задать вопросы и обсудить участие</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-10 rounded-[3rem] bg-[radial-gradient(circle,rgba(255,105,180,0.18),transparent_58%)] blur-2xl" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#111114] p-3 shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black aspect-[4/5]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(255,125,190,0.28),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_34%)]" />
                  <div className="absolute bottom-0 right-8 h-[76%] w-44 rounded-t-[7rem] bg-gradient-to-t from-zinc-900 via-zinc-800 to-zinc-700/75" />
                  <div className="absolute bottom-[58%] right-[6.25rem] h-24 w-24 rounded-full bg-zinc-700/90" />
                  <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px] opacity-[0.08]" />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-zinc-200/80">
                    Premium · Graphite · No explicit visuals
                  </div>
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-7 left-5 right-5 rounded-[1.5rem] border border-white/10 bg-black/35 p-5 backdrop-blur-md"
                  >
                    <div className="mb-3 flex items-center gap-2 text-sm text-pink-100/85">
                      <BadgeCheck className="h-4 w-4" />
                      Ученица Марии Вельс
                    </div>
                    <div className="text-2xl font-semibold">Сильная подача без визуального шума</div>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      Атмосфера вместо дешевого глянца, четкий CTA вместо крика, движение вместо хаоса.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="program" className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <SectionTitle
              eyebrow="О программе"
              title="О программе"
              text="Эта программа создана для девушек, которые хотят развить уверенность, сильную подачу, артистизм и навыки самопрезентации. Формат обучения индивидуальный. В центре внимания не теория ради теории, а практическая работа над образом, внутренним состоянием, подачей, коммуникацией и сценическим присутствием. Программа подойдет тем, кто хочет научиться производить впечатление, увереннее чувствовать себя в требовательной профессиональной среде и подготовиться к кастингам в премиальные иммерсивные проекты."
            />
            <div className="flex items-start lg:justify-end">
              <CTAButton onClick={() => setBookingOpen(true)}>
                Забронировать место
                <ArrowRight className="ml-2 h-4 w-4" />
              </CTAButton>
            </div>
          </div>
        </section>

        <section id="for-whom" className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <SectionTitle eyebrow="Для кого" title="Для кого эта программа" />
              <div className="mt-8 grid gap-3">
                {[
                  "Для девушек, которые хотят стать увереннее в себе",
                  "Для тех, кто хочет научиться красиво и сильно подавать себя",
                  "Для тех, кто чувствует в себе потенциал, но не умеет раскрыть его в полной мере",
                  "Для девушек, которые хотят развить артистизм, харизму и уверенное присутствие",
                  "Для тех, кто хочет подготовиться к кастингам и входу в более высокую профессиональную среду",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-zinc-200"
                  >
                    <div className="mt-0.5 rounded-full bg-pink-300/15 p-1 text-pink-200">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-7 text-zinc-300">
                Если вам это близко, но вы пока не готовы оплачивать сразу, оставьте заявку, и мы свяжемся с вами.
              </p>
              <div className="mt-6">
                <CTAButton variant="outline" onClick={() => setLeadOpen(true)}>
                  Оставить заявку
                </CTAButton>
              </div>
            </div>
            <SilhouetteVisual variant={1} className="aspect-[4/3] min-h-[360px]" />
          </div>
        </section>

        <section id="benefits" className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <SilhouetteVisual variant={2} className="aspect-[4/3] min-h-[360px]" />
            <div>
              <SectionTitle eyebrow="Что входит" title="Что входит в программу" />
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Индивидуальная работа в течение 7 дней",
                  "Разбор самопрезентации и сильных сторон",
                  "Работа над уверенностью и внутренней подачей",
                  "Развитие харизмы и сценического присутствия",
                  "Практика коммуникации и взаимодействия",
                  "Рекомендации по образу, манере и впечатлению",
                  "Подготовка к кастингам и профессиональной среде с высокими требованиями к подаче",
                  "Гарантированный выход на кастинг с пометкой «Ученица Марии Вельс»",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-zinc-200"
                  >
                    <div className="mt-0.5 rounded-full bg-pink-300/15 p-1 text-pink-200">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <CTAButton onClick={() => setBookingOpen(true)}>
                  Забронировать место
                  <ArrowRight className="ml-2 h-4 w-4" />
                </CTAButton>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <SectionTitle eyebrow="Как проходит" title="Как проходит обучение" />
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <Metric icon={Star} title="Формат" text="Индивидуально" />
                <Metric icon={Clock3} title="Продолжительность" text="7 дней" />
                <Metric icon={Clock3} title="Занятость" text="По 2 часа в день" />
                <Metric icon={MapPin} title="Город и локация" text="Москва, студия в центре города" />
              </div>
              <div className="mt-4 rounded-[1.25rem] border border-white/10 bg-white/5 p-4 text-sm text-zinc-200">
                Количество мест ограничено. После оплаты место фиксируется за вами.
              </div>
              <div className="mt-6">
                <CTAButton onClick={() => setBookingOpen(true)}>Забронировать место</CTAButton>
              </div>
            </div>
            <SilhouetteVisual variant={3} className="aspect-[4/3] min-h-[360px]" />
          </div>
        </section>

        <section id="casting" className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
            <div>
              <SectionTitle
                eyebrow="Кастинг"
                title="Возможность выхода на кастинг после обучения"
                text="После прохождения программы каждая участница гарантированно получает выход на кастинг с пометкой «Ученица Марии Вельс». Это дает возможность заявить о себе уже после обучения и выйти в профессиональную среду с дополнительной рекомендационной отметкой."
              />
              <div className="mt-6">
                <CTAButton onClick={() => setBookingOpen(true)}>
                  Забронировать место
                  <ArrowRight className="ml-2 h-4 w-4" />
                </CTAButton>
              </div>
            </div>
            <SilhouetteVisual variant={1} className="aspect-[4/3] min-h-[380px]" />
          </div>
        </section>

        <section id="maria" className="relative mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
          <Glow className="left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2" />
          <div className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55 }}
              className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-3"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,120,190,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_28%)]" />
              <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10">
                <img src={mariaImage} alt="Мария Вельс" className="h-full w-full object-cover grayscale" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.45))]" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-pink-100/85 backdrop-blur-md">
                    Автор программы
                  </div>
                  <div className="mt-3 text-2xl font-semibold">Мария Вельс</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <SectionTitle
                eyebrow="Почему девушки выбирают MARIA VELS | CLUB"
                title="Почему девушки выбирают MARIA VELS | CLUB"
                text="Это не массовый потоковый курс и не набор общих советов из интернета. Программа основана на личном практическом опыте Марии Вельс как действующей актрисы иммерсивного театра и на глубоком понимании того, как формируются подача, впечатление, сценическое присутствие и уверенность в требовательной профессиональной среде. Это индивидуальная работа, в которой внимание сосредоточено на вашей подаче, вашем образе, вашем ощущении себя и вашем умении производить впечатление. Здесь важен не просто набор навыков, а целостное состояние, с которым девушка входит в пространство, держит внимание и запоминается."
              />
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <SectionTitle eyebrow="После бронирования" title="Что происходит после бронирования" />
              <div className="mt-8 grid gap-3">
                {[
                  "Вы оплачиваете участие",
                  "За вами фиксируется место",
                  "С вами связываются для подтверждения",
                  "Вы получаете дальнейшие организационные детали",
                  "Согласовывается старт программы",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-sm text-zinc-200"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-300/15 text-pink-200">
                      {index + 1}
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <CTAButton onClick={() => setBookingOpen(true)}>Забронировать место</CTAButton>
              </div>
            </div>
            <SilhouetteVisual variant={2} className="aspect-[4/3] min-h-[380px]" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <SectionTitle
                eyebrow="Заявка"
                title="Если вы хотите сначала задать вопросы"
                text="Если вы хотите уточнить детали, обсудить формат или понять, подходит ли вам программа, оставьте заявку. Мы свяжемся с вами, ответим на вопросы и поможем понять, подходит ли вам участие."
              />
              <div className="mt-6">
                <CTAButton variant="outline" onClick={() => setLeadOpen(true)}>
                  Оставить заявку
                </CTAButton>
              </div>
            </div>
            <SilhouetteVisual variant={3} className="aspect-[4/3] min-h-[360px]" />
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
          <SectionTitle
            eyebrow="FAQ"
            align="center"
            title="Частые вопросы"
            text="Самая полезная часть любого лендинга после хорошей кнопки и честного смысла."
          />
          <div className="mt-10 space-y-4">
            {faqItems.map((item, index) => (
              <FAQItem
                key={item.q}
                q={item.q}
                a={item.a}
                isOpen={openFaq === index}
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm leading-7 text-zinc-300">
              Остались вопросы? Оставьте заявку, и мы свяжемся с вами.
            </p>
            <div className="mt-4">
              <CTAButton variant="outline" onClick={() => setLeadOpen(true)}>
                Оставить заявку
              </CTAButton>
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-6 md:px-6 md:pb-28">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#111114] via-[#0f0f12] to-black p-8 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,120,190,0.16),transparent_24%),radial-gradient(circle_at_85%_75%,rgba(255,120,190,0.12),transparent_20%)]" />
            <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-pink-200/80">
                  <FileText className="h-3.5 w-3.5" />
                  Количество мест ограничено
                </div>
                <h3 className="max-w-3xl text-3xl font-semibold leading-tight text-white md:text-5xl">
                  Если вы чувствуете, что готовы к этой работе над собой и хотите зафиксировать участие, переходите к бронированию. Если хотите сначала обсудить детали, оставьте заявку.
                </h3>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <CTAButton className="h-14 px-7 text-base" onClick={() => setBookingOpen(true)}>
                    Забронировать место
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </CTAButton>
                  <CTAButton variant="outline" className="h-14 px-7 text-base" onClick={() => setLeadOpen(true)}>
                    Оставить заявку
                  </CTAButton>
                </div>
              </div>

              <div className="relative h-full min-h-[300px] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 via-zinc-800 to-black" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(255,120,190,0.18),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_35%)]" />
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-0 right-8 h-[82%] w-44 rounded-t-[7rem] bg-gradient-to-t from-zinc-900 to-zinc-700/80"
                />
                <div className="absolute bottom-[62%] right-[6.3rem] h-24 w-24 rounded-full bg-zinc-700/95" />
                <div className="absolute left-6 top-6 text-[10px] uppercase tracking-[0.32em] text-zinc-300/75">
                  Final graphite visual
                </div>
                <div className="absolute inset-x-6 bottom-6 rounded-[1.5rem] border border-white/10 bg-black/35 p-5 backdrop-blur-md">
                  <div className="text-sm uppercase tracking-[0.2em] text-pink-100/75">Лендинг 2026</div>
                  <div className="mt-2 text-2xl font-semibold">Чистый ритм. Смелая типографика. Целевое движение.</div>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    Ровно столько анимации, сколько помогает продажам. Ни кадром больше.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/40">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-6">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-pink-200/80">MARIA VELS</div>
            <div className="mt-2 text-2xl font-semibold text-white">CLUB</div>
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">
              Премиальный лендинг с акцентом на доверие, четкие CTA, прозрачные документы и безопасную для модерации визуальную подачу без эротизма.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
            <a id="privacy" href="#" className="text-left transition hover:text-white">
              Политика в отношении обработки персональных данных
            </a>
            <a href="#" className="text-left transition hover:text-white">
              Согласие на обработку персональных данных
            </a>
            <a href="#" className="text-left transition hover:text-white">
              Согласие на получение информационных сообщений
            </a>
            <a id="rules" href="#" className="text-left transition hover:text-white">
              Правила участия
            </a>
            <a id="program-doc" href="#" className="text-left transition hover:text-white">
              Программа обучения
            </a>
            <a id="payments" href="#" className="text-left transition hover:text-white">
              Условия оплаты и возврата
            </a>
            <a href="#" className="text-left transition hover:text-white">
              Контакты
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}