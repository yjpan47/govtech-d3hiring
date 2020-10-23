const Teacher = require('../models/teacher');
const Student = require('../models/student');

exports.registerStudent = async (req, res, next) => {

	try {

		if (!(req.body && 'teacher' in req.body && typeof(req.body.teacher) === 'string' 
			&& 'students' in req.body && typeof(req.body.students) === 'object')) {
				return throwInvalidError('Invalid inputs', 400);
		}

		const teacherEmail = req.body.teacher;
		if (validateEmail(teacherEmail) === false) {
			return throwInvalidError('Teacher email invalid', 422)
		}

		let teacher = await Teacher.findByPk(teacherEmail);

		if (teacher === null) {
			teacher = await Teacher.create({email: teacherEmail});
		}
		const studentEmails = req.body.students;
		for (const studentEmail of studentEmails) {

			if (validateEmail(studentEmail) === false) {
				return throwInvalidError('Student email invalid', 422)
			}

			student = await Student.findByPk(studentEmail);
			

			if (!student) {
				student = await Student.create({email: studentEmail, suspended: false})
			}
			teacher.addStudent(student);
		};

		return res.status(204).json({message: 'Successfully registered students!'});
	} 
	catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
	  return err;
    };
}

exports.commonStudents = async (req, res, next) => {
		try {

			if (!Array.isArray(req.query.teacher)) {
				const teacherEmail = req.query.teacher;

				if (validateEmail(teacherEmail) === false) {
					return throwInvalidError('Teacher email invalid', 422)
				}

				const teacher = await Teacher.findByPk(teacherEmail);
				const students = await teacher.getStudents();
				return res.status(200).json({
					'students': students.map(student => student.email)
				});
			}
			else {
				const studentsSet = new Set()
				const teacherEmails = req.query.teacher;
				for (const teacherEmail of teacherEmails) {
					if (validateEmail(teacherEmail) === false) {
						return throwInvalidError('Teacher email invalid', 422)
					}
					const teacher = await Teacher.findByPk(teacherEmail);
					if (!teacher) {
						return throwInvalidError('Teacher not found!', 400)
					}
					const students = await teacher.getStudents();
					for (student of students) {
						studentsSet.add(student.email);
					}
				}
				return res.status(200).json({'students': Array.from(studentsSet)});
			}
		}
		catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
	}
}

exports.suspendStudent = async (req, res, next) => {
	try {

		if (!(req.body && 'student' in req.body && typeof(req.body.student) === 'string')) {
			return throwInvalidError('Invalid inputs', 400);
		}

		const studentEmail = req.body.student;

		if (validateEmail(studentEmail) === false) {
			return throwInvalidError('Student email invalid', 422)
		}

		const student = await Student.findByPk(studentEmail);

		if (!student) {
			return throwInvalidError('Student not found!', 400)
		}

		student.suspended = true;
		await student.save();
		return res.status(204).json({message: 'Successfully suspended student!'});
 
	}
	catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
	}	
}

exports.retrieveForNotifications = async (req, res, next) => {

	try {
		
		if (!(req.body && 'teacher' in req.body && typeof(req.body.teacher) === 'string' 
			&& 'notification' in req.body && typeof(req.body.notification) === 'string')) {
				return throwInvalidError('Invalid inputs', 400);
		}

		const teacherEmail = req.body.teacher;

		if (validateEmail(teacherEmail) === false) {
			return throwInvalidError('Teacher email invalid', 422)
		}

		const message = req.body.notification;
		const notifiedStudents = new Set();

		teacher = await Teacher.findByPk(teacherEmail);
		if (!teacher) {
			const error = new Error('Teacher not found.');
			error.statusCode = 422;
			throw error;
		}

		registeredStudents = await teacher.getStudents({ where: { suspended: false }});
		for (const student of registeredStudents) {
			notifiedStudents.add(student.email);
		}


		const mentioned = getMentions(message);
		for (const mention of mentioned) {
			const email = mention.substring(1);
			const student = await Student.findByPk(email);
			if (student && student.suspended === false) {
				notifiedStudents.add(student.email);
			}
		}

		const recipents = Array.from(notifiedStudents);
		return res.status(200).json({"recipients": recipents});
	}
	catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}	
}


function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function throwInvalidError(message, statusCode) {
	const error = new Error(message);
	error.statusCode = statusCode;
	throw error;
}


function getMentions(message) {
	const result = [];
	const words = message.split(" ");
	for (const word of words) {
		if (word.startsWith('@')) {
			result.push(word);
		} 
	}
	return result;
}
