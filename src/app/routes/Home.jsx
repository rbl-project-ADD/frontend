import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUp, Paperclip } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"


const Home = () => {
  const [messages, setMessages] = useState([{ text: 'Hello! How can I help you?', sender: 'bot' }]);
  const [inputValue, setInputValue] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const contentEditableRef = useRef(null);
  const textareaRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileToast = () => {
    const files = fileInputRef.current.files;

    if (files.length > 0) {
      const file = files[0];
      const fileType = file.type.split('/')[0];
      const fileName = file.name;

      toast(`${fileName}`, {
        className: 'border-2 border-secondary',
        description: `${fileType} file selected`,
        duration: 5000,
        action: {
          label: 'Undo',
          onClick: () => console.log('Action!'),
        },
      });
    }
  }

  const handleSendMessage = () => {
    const files = fileInputRef.current.files;

    if (inputValue.trim() || files.length > 0) {
      const newMessage = {
        text: inputValue.trim() || '',
        image: null,
        audio: null,
        sender: 'user',
      };

      if (files.length > 0) {
        const file = files[0];
        const fileType = file.type.split('/')[0];
        const fileURL = URL.createObjectURL(file);

        const reader = new FileReader();

        reader.onloadend = () => {

          if (fileType === 'image') {
            newMessage.image = fileURL;
          } else if (fileType === 'audio') {
            newMessage.audio = fileURL;
          }

          setMessages([...messages, newMessage]);

          setIsBotTyping(true);
          setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, { text: `We received an ${fileType} file named "${file.name}"`, sender: 'bot' }]);
            setIsBotTyping(false);
          }, 3000);
        };

        reader.readAsDataURL(file);
      } else {
        setMessages([...messages, newMessage]);


        setIsBotTyping(true);
        setTimeout(() => {
          setMessages(prevMessages => [...prevMessages, { text: 'Hello! How can I help you?', sender: 'bot' }]);
          setIsBotTyping(false);
        }, 3000);
      }


      setInputValue('');
      contentEditableRef.current.innerText = '';
      textareaRef.current.value = '';
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.innerText;
    setInputValue(value);
    textareaRef.current.value = value;
  };

  const handleTextareaChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    contentEditableRef.current.innerText = value;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col items-center h-screen p-4 bg-background">
      <ScrollArea className="flex-grow mb-4 space-y-3 w-3/4">
        <div className="flex flex-col">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-xs p-3 rounded-lg my-4 ${message.sender === 'user' ? 'bg-primary text-primary-foreground self-end' : 'bg-secondary text-secondary-foreground self-start'}`}
            >
              <p>{message.text}</p>
              {message.image && <img src={message.image} alt="attachment" />}
              {message.audio && <audio src={message.audio} controls />}
            </div>
          ))}
          {isBotTyping && (
            <div className="max-w-xs p-3 rounded-lg bg-secondary text-secondary-foreground self-start">
              Bot is typing...
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      <div className="flex items-center space-x-2 rounded-lg w-3/4 bg-transparent px-2 border-[2px] border-primary">
        {/* File Input */}
        <div className="flex-shrink-0 self-end p-2">
          <Input
            id="picture"
            type="file"
            className="size-0 hidden"
            ref={fileInputRef}
            accept="image/*,audio/*"
            onChange={handleFileToast}
          />
          <Button size="icon" onClick={handleIconClick}>
            <Paperclip size={20} color="black" />
          </Button>
        </div>

        {/* Editable Area */}
        <div className="flex-grow relative">
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleTextareaChange}
            className="hidden"
          />
          <div
            ref={contentEditableRef}
            contentEditable
            placeholder="Type a message..."
            onInput={handleInputChange}
            onKeyDown={handleKeyPress}
            className="flex-grow px-3 rounded-lg outline-none border-none focus:outline-none focus:ring-0 bg-transparent resize-none shadow-none placeholder:text-primary border overflow-y-auto"
            style={{ maxHeight: '150px' }}
          />
        </div>

        {/* Send Button */}
        <div className="flex-shrink-0 self-end p-2">
          <Button
            onClick={handleSendMessage}
            className="ml-2"
            disabled={isBotTyping}
            size="icon"
          >
            <ArrowUp size={20} color="black" />
          </Button>
        </div>
      </div>
    </div>

  );
};

export default Home;
