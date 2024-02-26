var questions = [
    {
      type: "true_false",
      question: "Câu 1: 2 + 2 = 4",
      answer: "true"
    },
    {
      type: "true_false",
      question: "Câu 2: JavaScript là một ngôn ngữ lập trình đa nền tảng.",
      answer: "true"
    },
    {
        type: "true_false",
        question: "Câu 3: 2 / 2 = 1",
        answer: "true"
    },
    {
        type: "true_false",
        question: "Câu 4: 12 + 24 = 35",
        answer: "false"
    },
    {
        type: "true_false",
        question: "Câu 5: 20 + 10 = 40",
        answer: "false"
    },
    {
        type: "single_choice",
        question: "Câu 6: Sơn tùng quê ở đâu?",
        choices: ["Thái Bình", "Nghệ An", "Hà Nội", "Bắc Ninh"],
        answer: "Thái Bình"
    },
    {
        type: "single_choice",
        question: "Câu 7: LOL là viết tắt của bộ môn esport nào?",
        choices: ["Dota2", "CS Go", "Free Fire", "Liên Minh Huyền Thoại"],
        answer: "Liên Minh Huyền Thoại"
    },
    {
      type: "single_choice",
      question: "Câu 8: Ngôn ngữ lập trình nào được sử dụng cho việc thiết kế web?",
      choices: ["Java", "C#", "JavaScript", "Python"],
      answer: "JavaScript"
    },
    {
        type: "single_choice",
        question: "Câu 9: Kẹo Cu Đơ là đặc sản của tỉnh nào?",
        choices: ["Nghệ An", "Hà Tĩnh", "Quảng Bình", "Thanh Hóa"],
        answer: "Hà Tĩnh"
    },
    {
        type: "single_choice",
        question: "Câu 10: Tỉnh nào có diện tích lớn nhất ở Việt Nam?",
        choices: ["Thanh Hóa", "Hà Tĩnh", "Nghệ An", "Điện Biên"],
        answer: "Nghệ An"
    },
    {
      type: "multiple_choice",
      question: "Câu 11: Những loài vật nào sau đây có vú, sống ở dưới nước?",
      choices: ["hải cẩu", "cá voi", "Cá heo", "bò biển"],
      answer: ["hải cẩu", "cá voi","bò biển"]
    },
    {
      type: "multiple_choice",
      question: "Câu 12: Những ngôn ngữ nào được sử dụng trong phát triển web?",
      choices: ["HTML", "CSS","Java", "JavaScript"],
      answer: ["HTML", "CSS", "JavaScript"]
    },
    {
      type: "multiple_choice",
      question: "Câu 13: Các môn đang học kì này?",
      choices: ["Cơ sở dữ liệu và phân tán", "C++", "LTWeb", "Lịch sử đảng"],
      answer: ["Cơ sở dữ liệu và phân tán", "LTWeb"]
    },
    {
        type: "multiple_choice",
        question: "Câu 14: Các nghành kỹ thuật trong PTIT bao gồm?",
        choices: ["Công nghệ thông tin", "Điện-Điện tử", "Truyền thông đa phương tiện", "Công nghệ đa phương tiện"],
        answer: ["Công nghệ thông tin", "Điện-Điện tử","Công nghệ đa phương tiện"]
    },
    {
      type: "tuluan",
      question: "Câu 15: Bạn tên là gì?",
      answer: "Đậu Minh Quân"
    }
  ];
  
  var quizContainer = document.getElementById('quiz');
  
  function displayQuestions() {
    questions.forEach(function(question, index) {
      var questionDiv = document.createElement('div');
      questionDiv.classList.add('question');
      questionDiv.innerHTML = '<p>' + question.question + '</p>';
      
      if (question.type === "true_false") {
        questionDiv.innerHTML += '<label><input type="radio" name="q' + index + '" value="true"> Đúng</label>' +
                                 '<label><input type="radio" name="q' + index + '" value="false"> Sai</label>';
      } else if (question.type === "single_choice") {
        question.choices.forEach(function(choice) {
          questionDiv.innerHTML += '<label><input type="radio" name="q' + index + '" value="' + choice + '"> ' + choice + '</label>';
        });
      } else if (question.type === "multiple_choice") {
        question.choices.forEach(function(choice) {
          questionDiv.innerHTML += '<label><input type="checkbox" name="q' + index + '" value="' + choice + '"> ' + choice + '</label>';
        });
      } else if (question.type === "tuluan") {
        questionDiv.innerHTML += '<textarea name="q' + index + '" rows="4" cols="50"></textarea>';
      }
      
      quizContainer.appendChild(questionDiv);
    });
  }
  
  displayQuestions();
  
  function submitQuiz() {
    var score = 0;
    var userAnswers = [];
    
    questions.forEach(function(question, index) {
      if (question.type === "true_false" || question.type === "single_choice") {
        var selectedAnswer = document.querySelector('input[name="q' + index + '"]:checked');
        if (selectedAnswer) {
          userAnswers.push(selectedAnswer.value);
if (selectedAnswer.value === question.answer) {
            score++;
          }
        } else {
          userAnswers.push("");
        }
      } else if (question.type === "multiple_choice") {
        var selectedAnswers = Array.from(document.querySelectorAll('input[name="q' + index + '"]:checked')).map(function(checkbox) {
          return checkbox.value;
        });
        userAnswers.push(selectedAnswers);
        if (arraysEqual(selectedAnswers, question.answer)) {
          score++;
        }
      } else if (question.type === "tuluan") {
        var essayAnswer = document.querySelector('textarea[name="q' + index + '"]').value;
        if(essayAnswer ===question.answer){
            score++;
        }
        userAnswers.push(essayAnswer);
      }
    });
    
    var result = "Điểm của bạn là: " + score +  "\nBạn đã trả lời đúng " + score + " câu trên " + questions.length + ".\n\n" + "Câu trả lời bạn đã nộp:\n";
    userAnswers.forEach(function(answer, index) {
      if (Array.isArray(answer)) {
        result += "Câu " + (index + 1) + ": " + (answer.length > 0 ? answer.join(', ') : "Không trả lời") + "\n";
      } else {
        result += "Câu " + (index + 1) + ": " + (answer === "" ? "Không trả lời" : answer) + "\n";
      }
    });
    
    alert(result);
  }
  
  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }