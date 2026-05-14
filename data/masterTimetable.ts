const masterTimetable = {

  BTech: {
    "Sem 2": {

      A: {
        Monday: {
          "10:00-10:55": { subject: "Digital Logic Design", faculty: "PN", room: "409" },
          "11:00-11:55": { subject: "Fundamental of Forensic Science", faculty: "MP", room: "409" },
          "12:00-12:55": { subject: "OOPS with C++", faculty: "NS", room: "409" },
          "02:00-02:55": { subject: "Engineering Mathematics II", faculty: "NM", room: "409" },
          "03:00-03:55": { subject: "Library", faculty: "-", room: "-" },
          "04:00-04:55": { subject: "Environmental Science", faculty: "AK", room: "409" }
        },

        Tuesday: {
          "10:00-10:55": { subject: "Engineering Mathematics II", faculty: "NM", room: "409" },
          "11:00-11:55": { subject: "Digital Logic Design", faculty: "AU", room: "409" },
          "12:00-12:55": { subject: "Forensic Science & Law", faculty: "MP", room: "409" },
          "02:00-02:55": { subject: "OOPS with C++ Lab", faculty: "NS/KS", room: "413" },
          "03:00-03:55": { subject: "Professional Ethics", faculty: "AS", room: "409" },
          "04:00-04:55": { subject: "Library", faculty: "-", room: "-" }
        },

        Wednesday: {
          "10:00-10:55": { subject: "Professional Ethics", faculty: "AS", room: "409" },
          "11:00-11:55": { subject: "Engineering Mathematics II", faculty: "NM", room: "409" },
          "12:00-12:55": { subject: "OOPS with C++", faculty: "NS", room: "409" },
          "02:00-02:55": { subject: "Forensic Science & Law", faculty: "MP", room: "409" },
          "03:00-03:55": { subject: "Library", faculty: "-", room: "-" },
          "04:00-04:55": { subject: "Digital Logic Design", faculty: "PN", room: "409" }
        },

        Thursday: {
          "10:00-10:55": { subject: "Digital Logic Design Lab", faculty: "AU", room: "407" },
          "11:00-11:55": { subject: "Forensic Science & Law", faculty: "MJ", room: "409" },
          "12:00-12:55": { subject: "Engineering Mathematics II", faculty: "NM", room: "409" },
          "02:00-02:55": { subject: "Cryptography (Intro)", faculty: "KKD", room: "409" },
          "03:00-03:55": { subject: "Digital Logic Design", faculty: "PN", room: "409" },
          "04:00-04:55": { subject: "Library", faculty: "-", room: "-" }
        },

        Friday: {
          "10:00-10:55": { subject: "Environmental Science", faculty: "AK", room: "409" },
          "11:00-11:55": { subject: "Digital Logic Design", faculty: "PN", room: "409" },
          "12:00-12:55": { subject: "Forensic Science & Law", faculty: "RC", room: "409" },
          "02:00-02:55": { subject: "OOPS with C++ Lab", faculty: "NS/KS", room: "417" },
          "03:00-03:55": { subject: "Digital Logic Design Lab", faculty: "PN", room: "407" },
          "04:00-04:55": { subject: "Library", faculty: "-", room: "-" }
        }
      },

      B: {
        Monday: {
          "10:00-10:55": { subject: "Engineering Mathematics II", faculty: "NM", room: "415" },
          "11:00-11:55": { subject: "Forensic Science & Law", faculty: "MJ", room: "415" },
          "12:00-12:55": { subject: "Digital Logic Design", faculty: "AU", room: "415" },
          "02:00-02:55": { subject: "OOPS with C++", faculty: "NS", room: "415" },
          "03:00-03:55": { subject: "Environmental Science", faculty: "AK", room: "415" },
          "04:00-04:55": { subject: "Library", faculty: "-", room: "-" }
        },

        Tuesday: {
          "10:00-10:55": { subject: "Digital Logic Design", faculty: "AU", room: "415" },
          "11:00-11:55": { subject: "Engineering Mathematics II", faculty: "NM", room: "415" },
          "12:00-12:55": { subject: "Forensic Science & Law", faculty: "MP", room: "415" },
          "02:00-02:55": { subject: "OOPS with C++", faculty: "NS", room: "415" },
          "03:00-03:55": { subject: "Library", faculty: "-", room: "-" },
          "04:00-04:55": { subject: "Environmental Science", faculty: "AK", room: "415" }
        },

        Wednesday: {
          "10:00-10:55": { subject: "OOPS with C++", faculty: "NS", room: "415" },
          "11:00-11:55": { subject: "Engineering Mathematics II", faculty: "NM", room: "415" },
          "12:00-12:55": { subject: "Forensic Science & Law", faculty: "AK", room: "415" },
          "02:00-02:55": { subject: "Digital Logic Design", faculty: "PN", room: "415" },
          "03:00-03:55": { subject: "Professional Ethics", faculty: "AS", room: "415" },
          "04:00-04:55": { subject: "Library", faculty: "-", room: "-" }
        },

        Thursday: {
          "10:00-10:55": { subject: "Environmental Science", faculty: "AK", room: "415" },
          "11:00-11:55": { subject: "Forensic Science & Law", faculty: "MJ", room: "415" },
          "12:00-12:55": { subject: "Digital Logic Design", faculty: "AU", room: "415" },
          "02:00-02:55": { subject: "OOPS with C++ Lab", faculty: "NS/KS", room: "407" },
          "03:00-03:55": { subject: "Engineering Mathematics II", faculty: "NM", room: "415" },
          "04:00-04:55": { subject: "Library", faculty: "-", room: "-" }
        },

        Friday: {
          "10:00-10:55": { subject: "Digital Logic Design", faculty: "PN", room: "415" },
          "11:00-11:55": { subject: "Forensic Science & Law", faculty: "RC", room: "415" },
          "12:00-12:55": { subject: "Environmental Science", faculty: "AK", room: "415" },
          "02:00-02:55": { subject: "OOPS with C++", faculty: "NS", room: "415" },
          "03:00-03:55": { subject: "Digital Logic Design Lab", faculty: "AU", room: "407" },
          "04:00-04:55": { subject: "Library", faculty: "-", room: "-" }
        }
      }

    },
    "Sem 4": {

      Default: {

        Monday: {
          "10:00-10:55": { subject: "Operating System", faculty: "PR", room: "315" },
          "11:00-11:55": { subject: "Engineering Mathematics IV", faculty: "NM", room: "315" },
          "12:00-12:55": { subject: "Web Application Development", faculty: "JK", room: "315" },
          "02:00-02:55": { subject: "Computer Networks", faculty: "MR", room: "315" },
          "03:00-03:55": { subject: "PCC 403 Lab (G2)", faculty: "KKD/KS", room: "417" },
          "04:00-04:55": { subject: "PCC 404 Lab (G1)", faculty: "JK", room: "413" }
        },

        Tuesday: {
          "10:00-10:55": { subject: "Operating System Lab (G1)", faculty: "PR/KS", room: "417" },
          "11:00-11:55": { subject: "Economics", faculty: "YC", room: "315" },
          "12:00-12:55": { subject: "Cryptography", faculty: "KKD", room: "315" },
          "02:00-02:55": { subject: "Computer Networks", faculty: "MR", room: "315" },
          "03:00-03:55": { subject: "Library", faculty: "-", room: "-" },
          "04:00-04:55": { subject: "Engineering Mathematics IV", faculty: "NM", room: "315" }
        },

        Wednesday: {
          "10:00-10:55": { subject: "Cryptography", faculty: "KKD", room: "315" },
          "11:00-11:55": { subject: "Web Application Development", faculty: "JK", room: "315" },
          "12:00-12:55": { subject: "Economics", faculty: "YC", room: "315" },
          "02:00-02:55": { subject: "Operating System Lab (G2)", faculty: "PR/KS", room: "417" },
          "03:00-03:55": { subject: "Computer Networks Lab", faculty: "MR", room: "413" },
          "04:00-04:55": { subject: "Library", faculty: "-", room: "-" }
        },

        Thursday: {
          "10:00-10:55": { subject: "Engineering Mathematics IV", faculty: "NM", room: "315" },
          "11:00-11:55": { subject: "Operating System", faculty: "PR", room: "315" },
          "12:00-12:55": { subject: "Cryptography", faculty: "KKD", room: "315" },
          "02:00-02:55": { subject: "Web Application Development", faculty: "JK", room: "315" },
          "03:00-03:55": { subject: "Operating System Lab (G2)", faculty: "PR/KS", room: "417" },
          "04:00-04:55": { subject: "Library", faculty: "-", room: "-" }
        },

        Friday: {
          "10:00-10:55": { subject: "Cryptography", faculty: "KKD", room: "315" },
          "11:00-11:55": { subject: "Computer Networks Lab (G2)", faculty: "MR", room: "413" },
          "12:00-12:55": { subject: "Engineering Mathematics IV", faculty: "NM", room: "315" },
          "02:00-02:55": { subject: "Web Application Development", faculty: "JK", room: "315" },
          "03:00-03:55": { subject: "Library", faculty: "-", room: "-" },
          "04:00-04:55": { subject: "Operating System", faculty: "PR", room: "315" }
        }

      }

    }

},
  Law: {

    "B.Sc.LL.B": {

      "Sem 2": {
        Default: {

          Monday: {
            "09:30-10:25": { subject: "Statistics", faculty: "KKD", room: "512" },
            "10:30-11:25": { subject: "OOPS (C++)", faculty: "DKV", room: "512" },
            "11:30-12:25": { subject: "Constitutional Law", faculty: "HR", room: "512" },
            "01:30-02:25": { subject: "Jurisprudence", faculty: "SM", room: "512" },
            "02:30-03:25": { subject: "Library", faculty: "-", room: "-" }
          },

          Tuesday: {
            "09:30-10:25": { subject: "Statistics", faculty: "KKD", room: "512" },
            "10:30-11:25": { subject: "RDBMS", faculty: "JK", room: "512" },
            "11:30-12:25": { subject: "Jurisprudence", faculty: "SM", room: "512" },
            "01:30-02:25": { subject: "Law & Society", faculty: "SM", room: "512" },
            "02:30-03:25": { subject: "Library", faculty: "-", room: "-" }
          },

          Wednesday: {
            "09:30-10:25": { subject: "Statistics", faculty: "KKD", room: "512" },
            "10:30-11:25": { subject: "Constitutional Law", faculty: "HR", room: "512" },
            "11:30-12:25": { subject: "Jurisprudence", faculty: "RC", room: "512" },
            "01:30-02:25": { subject: "Law & Society", faculty: "SM", room: "512" },
            "02:30-03:25": { subject: "Library", faculty: "-", room: "-" }
          },

          Thursday: {
            "09:30-10:25": { subject: "Legal Language", faculty: "AT", room: "512" },
            "10:30-11:25": { subject: "Jurisprudence", faculty: "RC", room: "512" },
            "11:30-12:25": { subject: "RDBMS", faculty: "JK", room: "512" },
            "01:30-02:25": { subject: "Library", faculty: "-", room: "-" }
          },

          Friday: {
            "09:30-10:25": { subject: "Jurisprudence", faculty: "RC", room: "512" },
            "10:30-11:25": { subject: "Library", faculty: "-", room: "-" }
          }

        }
      },

      "Sem 4": {
        Default: {

          Monday: {
            "09:30-10:25": { subject: "Constitutional Law II", faculty: "HR", room: "513" },
            "10:30-11:25": { subject: "Bhartiya Nagrik Suraksha", faculty: "RC", room: "513" },
            "11:30-12:25": { subject: "Family Law II", faculty: "HR", room: "513" }
          },

          Tuesday: {
            "09:30-10:25": { subject: "Programming in Python", faculty: "NS", room: "513" },
            "10:30-11:25": { subject: "Family Law II", faculty: "HR", room: "513" }
          },

          Wednesday: {
            "09:30-10:25": { subject: "Law of Specific Contract", faculty: "MJ", room: "513" }
          },

          Thursday: {
            "09:30-10:25": { subject: "Programming in Python", faculty: "NS", room: "513" }
          },

          Friday: {
            "09:30-10:25": { subject: "Data Warehousing", faculty: "DKV", room: "513" }
          }

        }
      }

    },

    "LL.M Criminal": {
      "Sem 2": {
        Default: {
          Monday: { "09:30-10:25": { subject: "Forensic Justice", faculty: "PG", room: "506" } },
          Tuesday: { "09:30-10:25": { subject: "Criminal Justice System", faculty: "MJ", room: "506" } },
          Wednesday: { "09:30-10:25": { subject: "Victimology", faculty: "ST", room: "506" } },
          Thursday: { "09:30-10:25": { subject: "Financial Crimes", faculty: "HR", room: "506" } },
          Friday: { "09:30-10:25": { subject: "Transnational Crimes", faculty: "ST", room: "506" } }
        }
      }
    },

    "LL.M Cyber": {
      "Sem 2": {
        Default: {
          Monday: { "09:30-10:25": { subject: "Audit & Risk Management", faculty: "SM", room: "519" } },
          Tuesday: { "09:30-10:25": { subject: "Digital Forensics", faculty: "PA", room: "519" } },
          Wednesday: { "09:30-10:25": { subject: "Cyber Space Technology", faculty: "RC", room: "519" } },
          Thursday: { "09:30-10:25": { subject: "Mobile & Network Forensics", faculty: "JK", room: "519" } },
          Friday: { "09:30-10:25": { subject: "Research Work", faculty: "Law Faculty", room: "519" } }
        }
      }
    }

  },
    Integrated: {

    "Sem 2": {
      Default: {

        Monday: {
          "09:30-10:25": { subject: "Indian Knowledge System", faculty: "YS", room: "215" },
          "10:30-11:25": { subject: "Forensic Physics", faculty: "MP", room: "215" },
          "11:30-12:25": { subject: "Financial Literacy", faculty: "SKY", room: "215" },
          "01:30-02:25": { subject: "General Biology I", faculty: "SS", room: "215" },
          "02:30-03:25": { subject: "Practical-II (M1)", faculty: "PG", room: "Lab" }
        },

        Tuesday: {
          "09:30-10:25": { subject: "General Physics II", faculty: "AU", room: "215" },
          "10:30-11:25": { subject: "General Biology I", faculty: "SS", room: "215" },
          "11:30-12:25": { subject: "Financial Literacy", faculty: "SKY", room: "215" },
          "01:30-02:25": { subject: "English Language Skill II", faculty: "AT", room: "215" },
          "02:30-03:25": { subject: "Practical-II (M2)", faculty: "SS/ST", room: "Lab" }
        },

        Wednesday: {
          "09:30-10:25": { subject: "Fingerprint Science", faculty: "PG", room: "215" },
          "10:30-11:25": { subject: "General Physics II", faculty: "AU", room: "215" },
          "11:30-12:25": { subject: "Criminal & Evidence Law", faculty: "DST", room: "215" },
          "01:30-02:25": { subject: "English Language Skill II", faculty: "AT", room: "215" },
          "02:30-03:25": { subject: "Practical-II (M3)", faculty: "AU", room: "Lab" }
        }

      }
    },

    "Sem 4": {
      Default: {

        Monday: {
          "09:30-10:25": { subject: "Forensic Toxicology", faculty: "NA", room: "108" },
          "10:30-11:25": { subject: "Forensic Physics", faculty: "MP", room: "108" },
          "11:30-12:25": { subject: "Forensic Medicine", faculty: "PS", room: "108" }
        },

        Tuesday: {
          "09:30-10:25": { subject: "Multimedia Forensics", faculty: "AS", room: "108" },
          "10:30-11:25": { subject: "Forensic Biology", faculty: "AJK", room: "108" }
        }

      }
    }

  },

  MSc: {

    "Sem 2": {
      Default: {

        Monday: {
          "09:30-10:25": { subject: "Quality Management & Narcotics", faculty: "ST", room: "209" },
          "10:30-11:25": { subject: "Forensic Serology & DNA", faculty: "SDG", room: "209" },
          "11:30-12:25": { subject: "Forensic Ballistics", faculty: "RPP", room: "209" }
        },

        Tuesday: {
          "09:30-10:25": { subject: "Digital Forensics", faculty: "AS", room: "209" },
          "10:30-11:25": { subject: "Forensic Medicine & Toxicology", faculty: "NA/PS", room: "209" }
        }

      }
    }

  }


};

export default masterTimetable;
