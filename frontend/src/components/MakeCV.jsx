import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaPlus, FaClipboardList, FaBell, FaSignOutAlt, FaTimes, FaBars, FaBuilding, FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaList, FaDownload } from 'react-icons/fa';
import backgroundImage from '../assets/employer.jpg';
import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle, Packer } from 'docx';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'tween' }}
          className="fixed left-0 top-0 h-full w-64 bg-black bg-opacity-90 text-white p-5 z-50"
        >
          <button onClick={toggleSidebar} className="absolute top-5 right-5 text-white mt-[60px]">
            <FaTimes size={24} />
          </button>
          <nav className="mt-[80px] space-y-6">
            {[
              { icon: FaList, text: 'Menu', link: '/employee' },
              { icon: FaUser, text: 'Profile', link: '/employee/profileemp' },
              { icon: FaPlus, text: 'Make CV', link: '/employee/make-cv' },
              { icon: FaClipboardList, text: 'Applied Jobs', link: '/employee/applied-jobs' },
              { icon: FaBell, text: 'Notifications', link: '/employee/notifications' },
            ].map((item, index) => (
              <React.Fragment key={item.text}>
                <Link to={item.link}>
                  <motion.div
                    className="flex items-center space-x-3 text-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon size={20} />
                    <span>{item.text}</span>
                  </motion.div>
                </Link>
                {index < 4 && <hr className="border-gray-600 pt-4" />}
              </React.Fragment>
            ))}
          </nav>
          <Link to="/">
            <motion.div
              className="absolute bottom-5 left-5 flex items-center space-x-3 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignOutAlt size={20} />
              <span>Logout</span>
            </motion.div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );

const InputField = ({ label, name, value, onChange, type = 'text' }) => (
  <motion.div
    className="mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <label className="block text-white mb-2" htmlFor={name}>{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
    />
  </motion.div>
);

const MakeCV = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [cvData, setCvData] = useState({
    personalInfo: { name: '', email: '', phone: '', location: '' },
    education: [{ school: '', degree: '', location: '', startDate: '', endDate: '', gpa: '' }],
    workExperience: [{ company: '', position: '', location: '', startDate: '', endDate: '', description: '' }],
    skills: [''],
    achievements: [''],
  });
  const [selectedTemplate, setSelectedTemplate] = useState('template1');

  const handleInputChange = (section, index, field, value) => {
    const newData = { ...cvData };
    if (section === 'personalInfo') {
      newData[section][field] = value;
    } else if (Array.isArray(newData[section])) {
      if (typeof newData[section][index] === 'object') {
        newData[section][index][field] = value;
      } else {
        newData[section][index] = value;
      }
    }
    setCvData(newData);
  };

  const addSection = (section) => {
    const newData = { ...cvData };
    if (section === 'education') {
      newData.education.push({ school: '', degree: '', location: '', startDate: '', endDate: '', gpa: '' });
    } else if (section === 'workExperience') {
      newData.workExperience.push({ company: '', position: '', location: '', startDate: '', endDate: '', description: '' });
    } else {
      newData[section].push('');
    }
    setCvData(newData);
  };
  const generateCV = async () => {
    try {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            // Personal Introduction
            new Paragraph({
              text: "Personal Introduction",
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph({
              text: "A dedicated professional with expertise in [Your Field/Industry]. Known for a strong ability to [highlight skills, e.g., analyze, collaborate]. Seeking to leverage my experience in [specific area] to contribute effectively in a growth-oriented role.",
              alignment: AlignmentType.JUSTIFIED,
              spacing: { after: 200 },
            }),
            
            // Personal Information
            new Paragraph({
              text: cvData.personalInfo.name,
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              children: [
                new TextRun(cvData.personalInfo.email),
                new TextRun(" | "),
                new TextRun(cvData.personalInfo.phone),
                new TextRun(" | "),
                new TextRun(cvData.personalInfo.location),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 300 },
            }),
  
            // Education Section
            new Paragraph({
              text: "Education",
              heading: HeadingLevel.HEADING_2,
            }),
            ...cvData.education.map(edu => new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph(edu.school)],
                      borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE } },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: `${edu.startDate} - ${edu.endDate}`, alignment: AlignmentType.RIGHT })],
                      borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE } },
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph(edu.degree)],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: `GPA: ${edu.gpa}`, alignment: AlignmentType.RIGHT })],
                    }),
                  ],
                }),
              ],
              spacing: { after: 200 },
            })),
  
            // Work Experience Section
            new Paragraph({
              text: "Work Experience",
              heading: HeadingLevel.HEADING_2,
            }),
            ...cvData.workExperience.map(exp => new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph(exp.company)],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: `${exp.startDate} - ${exp.endDate}`, alignment: AlignmentType.RIGHT })],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: exp.position,
                          heading: HeadingLevel.HEADING_3,
                        }),
                        new Paragraph({
                          text: exp.description || "• Developed and implemented [specific tasks] to improve [area of impact].\n• Collaborated with teams to ensure [objective].\n• Successfully managed [tasks], resulting in [results].",
                          bullet: { level: 0 },
                        }),
                      ],
                    }),
                  ],
                }),
              ],
              spacing: { after: 200 },
            })),
  
            // Skills Section
            new Paragraph({
              text: "Skills",
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              children: cvData.skills.map(skill => new TextRun({ text: skill, break: 1 })),
              spacing: { after: 300 },
            }),
  
            // Achievements Section
            new Paragraph({
              text: "Achievements",
              heading: HeadingLevel.HEADING_2,
            }),
            ...cvData.achievements.map(achievement => new Paragraph({
              text: achievement,
              bullet: { level: 0 },
            })),
          ],
        }],
      });
  
      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${cvData.personalInfo.name}_CV.docx`);
    } catch (error) {
      console.error('Error in generateCV:', error);
    }
  };
  //     try {
//       console.log('Starting CV generation');
//       console.log('Document class:', Document);
//       const doc = new Document({
//         creator: "Your App Name",
//         title: "CV Document",
//         description: "A CV generated by Your App Name",
//       });
//       console.log('Document created');

//   // Personal Information
//   doc.addSection({
//     properties: {},
//     children: [
//       new Paragraph({
//         text: cvData.personalInfo.name,
//         heading: HeadingLevel.HEADING_1,
//         alignment: AlignmentType.CENTER,
//       }),
//       new Paragraph({
//         alignment: AlignmentType.CENTER,
//         children: [
//           new TextRun(cvData.personalInfo.email),
//           new TextRun(" | "),
//           new TextRun(cvData.personalInfo.phone),
//           new TextRun(" | "),
//           new TextRun(cvData.personalInfo.location),
//         ],
//       }),
//     ],
//   });
//   console.log('Personal information added');

//   // Education
//   doc.addSection({
//     properties: {},
//     children: [
//       new Paragraph({
//         text: "Education",
//         heading: HeadingLevel.HEADING_2,
//       }),
//       ...cvData.education.map(edu => new Table({
//         width: {
//           size: 100,
//           type: WidthType.PERCENTAGE,
//         },
//         rows: [
//           new TableRow({
//             children: [
//               new TableCell({
//                 children: [new Paragraph(edu.school)],
//               }),
//               new TableCell({
//                 children: [new Paragraph({ text: edu.location, alignment: AlignmentType.RIGHT })],
//               }),
//             ],
//           }),
//           new TableRow({
//             children: [
//               new TableCell({
//                 children: [new Paragraph(edu.degree)],
//               }),
//               new TableCell({
//                 children: [new Paragraph({ text: `${edu.startDate} - ${edu.endDate}`, alignment: AlignmentType.RIGHT })],
//               }),
//             ],
//           }),
//           new TableRow({
//             children: [
//               new TableCell({
//                 children: [new Paragraph(`GPA: ${edu.gpa}`)],
//               }),
//             ],
//           }),
//         ],
//       })),
//     ],
//   });

//   // Work Experience
//   doc.addSection({
//     properties: {},
//     children: [
//       new Paragraph({
//         text: "Work Experience",
//         heading: HeadingLevel.HEADING_2,
//       }),
//       ...cvData.workExperience.map(exp => new Table({
//         width: {
//           size: 100,
//           type: WidthType.PERCENTAGE,
//         },
//         rows: [
//           new TableRow({
//             children: [
//               new TableCell({
//                 children: [new Paragraph(exp.company)],
//               }),
//               new TableCell({
//                 children: [new Paragraph({ text: exp.location, alignment: AlignmentType.RIGHT })],
//               }),
//             ],
//           }),
//           new TableRow({
//             children: [
//               new TableCell({
//                 children: [new Paragraph(exp.position)],
//               }),
//               new TableCell({
//                 children: [new Paragraph({ text: `${exp.startDate} - ${exp.endDate}`, alignment: AlignmentType.RIGHT })],
//               }),
//             ],
//           }),
//           new TableRow({
//             children: [
//               new TableCell({
//                 children: [new Paragraph(exp.description)],
//               }),
//             ],
//           }),
//         ],
//       })),
//     ],
//   });

//   // Skills
//   doc.addSection({
//     properties: {},
//     children: [
//       new Paragraph({
//         text: "Skills",
//         heading: HeadingLevel.HEADING_2,
//       }),
//       new Paragraph({
//         children: cvData.skills.map(skill => new TextRun({ text: skill, break: 1 })),
//       }),
//     ],
//   });

//   // Achievements
//   doc.addSection({
//     properties: {},
//     children: [
//       new Paragraph({
//         text: "Achievements",
//         heading: HeadingLevel.HEADING_2,
//       }),
//       ...cvData.achievements.map(achievement => new Paragraph({
//         text: achievement,
//         bullet: {
//           level: 0,
//         },
//       })),
//     ],
//   });

//   console.log('All sections added, preparing to generate blob');
//     Packer.toBlob(doc).then(blob => {
//       console.log('Blob generated, saving file');
//       saveAs(blob, `${cvData.personalInfo.name}_CV.docx`);
//     }).catch(error => {
//       console.error('Error generating blob:', error);
//     });
//   } catch (error) {
//     console.error('Error in generateCV:', error);
//   }
// };

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="absolute inset-0 bg-black opacity-70 h-[3000px]"></div>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="relative z-10 min-h-screen px-8 pb-8 pt-[70px] ">
        <main className="relative z-10 overflow-y-auto p-8">
        <button onClick={toggleSidebar} className="mb-6 text-2xl text-white">
              <FaBars />
            </button>
          <motion.h1
            className="text-3xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Create Your CV
          </motion.h1>

          <motion.div
            className="bg-white bg-opacity-10 rounded-lg p-6 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Personal Information</h2>
            <InputField label="Full Name" name="name" value={cvData.personalInfo.name} onChange={(e) => handleInputChange('personalInfo', null, 'name', e.target.value)} />
            <InputField label="Email" name="email" type="email" value={cvData.personalInfo.email} onChange={(e) => handleInputChange('personalInfo', null, 'email', e.target.value)} />
            <InputField label="Phone" name="phone" type="tel" value={cvData.personalInfo.phone} onChange={(e) => handleInputChange('personalInfo', null, 'phone', e.target.value)} />
            <InputField label="Location" name="location" value={cvData.personalInfo.location} onChange={(e) => handleInputChange('personalInfo', null, 'location', e.target.value)} />
          </motion.div>

          <motion.div
            className="bg-white bg-opacity-10 rounded-lg p-6 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Education</h2>
            {cvData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <InputField label="School/College" name={`school-${index}`} value={edu.school} onChange={(e) => handleInputChange('education', index, 'school', e.target.value)} />
                <InputField label="Degree" name={`degree-${index}`} value={edu.degree} onChange={(e) => handleInputChange('education', index, 'degree', e.target.value)} />
                <InputField label="Location" name={`edu-location-${index}`} value={edu.location} onChange={(e) => handleInputChange('education', index, 'location', e.target.value)} />
                <InputField label="Start Date" name={`edu-start-${index}`} type="date" value={edu.startDate} onChange={(e) => handleInputChange('education', index, 'startDate', e.target.value)} />
                <InputField label="End Date" name={`edu-end-${index}`} type="date" value={edu.endDate} onChange={(e) => handleInputChange('education', index, 'endDate', e.target.value)} />
                <InputField label="GPA" name={`gpa-${index}`} value={edu.gpa} onChange={(e) => handleInputChange('education', index, 'gpa', e.target.value)} />
              </div>
            ))}
            <button onClick={() => addSection('education')} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Add Education</button>
          </motion.div>

          <motion.div
            className="bg-white bg-opacity-10 rounded-lg p-6 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Work Experience</h2>
            {cvData.workExperience.map((exp, index) => (
              <div key={index} className="mb-4">
                <InputField label="Company" name={`company-${index}`} value={exp.company} onChange={(e) => handleInputChange('workExperience', index, 'company', e.target.value)} />
                <InputField label="Position" name={`position-${index}`} value={exp.position} onChange={(e) => handleInputChange('workExperience', index, 'position', e.target.value)} />
                <InputField label="Location" name={`work-location-${index}`} value={exp.location} onChange={(e) => handleInputChange('workExperience', index, 'location', e.target.value)} />
                <InputField label="Start Date" name={`work-start-${index}`} type="date" value={exp.startDate} onChange={(e) => handleInputChange('workExperience', index, 'startDate', e.target.value)} />
                <InputField label="End Date" name={`work-end-${index}`} type="date" value={exp.endDate} onChange={(e) => handleInputChange('workExperience', index, 'endDate', e.target.value)} />
                <textarea
                  className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
                  placeholder="Job Description"
                  value={exp.description}
                  onChange={(e) => handleInputChange('workExperience', index, 'description', e.target.value)}
                ></textarea>
              </div>
            ))}
            <button onClick={() => addSection('workExperience')} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Add Work Experience</button>
          </motion.div>

          <motion.div
            className="bg-white bg-opacity-10 rounded-lg p-6 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Skills</h2>
            {cvData.skills.map((skill, index) => (
              <InputField 
              key={index} 
              label={`Skill ${index + 1}`} 
              name={`skill-${index}`} 
              value={skill} 
              onChange={(e) => handleInputChange('skills', index, null, e.target.value)} 
            />
          ))}
          <button onClick={() => addSection('skills')} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Add Skill</button>
        </motion.div>
          <motion.div
            className="bg-white bg-opacity-10 rounded-lg p-6 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Achievements</h2>
              {cvData.achievements.map((achievement, index) => (
                <InputField 
                  key={index} 
                  label={`Achievement ${index + 1}`} 
                  name={`achievement-${index}`} 
                  value={achievement} 
                  onChange={(e) => handleInputChange('achievements', index, null, e.target.value)} 
                />
              ))}
              <button onClick={() => addSection('achievements')} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Add Achievement</button>
          </motion.div>

          <motion.div
            className="bg-white bg-opacity-10 rounded-lg p-6 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Choose Template</h2>
            <select
              className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
            >
              <option value="template1">Professional</option>
              <option value="template2">Creative</option>
              <option value="template3">Modern</option>
              <option value="template4">Classic</option>
              <option value="template5">Minimalist</option>
            </select>
          </motion.div>

          <motion.button
            className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center justify-center w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateCV}
          >
            <FaDownload className="mr-2" />
            Generate and Download CV
          </motion.button>
        </main>
      </div>
    </div>
  );
};

export default MakeCV;
